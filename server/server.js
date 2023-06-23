const express = require('express');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(cors());

mongoose.connect('mongodb://localhost:27042/mern-pool', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Create a storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Set the destination folder for uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original file name as the uploaded file name
    },
});

// Create an instance of the multer middleware
const upload = multer({ storage });

const fs = require('fs');
const path = require('path');
const { ECDH } = require('crypto');

// Serve static files from the 'client/public' directory
app.use(express.static(path.join(__dirname, '../client/public')));

// Handle image requests
app.get('/images/:image_name', (req, res) => {
    const imageName = req.params.image_name;

    // Get the list of supported image extensions
    const supportedExtensions = ['.jpeg', '.jpg', '.png'];

    // Find the image file with any extension
    const image = supportedExtensions.find((extension) => {
        const imagePath = path.join(__dirname, '../client/public/images', imageName + extension);
        return fs.existsSync(imagePath);
    });

    if (image) {
        const imagePath = path.join(__dirname, '../client/public/images', imageName + image);
        res.sendFile(imagePath);
    } else {
        res.sendStatus(404);
    }
});

const studentSchema = new mongoose.Schema({
    login: {
        type: String,
        minlength: 5,
        maxlength: 20,
        required: true,
    },
    email: {
        type: String,
        match: /^.*@.*\..*$/,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
    },
});

const Student = mongoose.model('Student', studentSchema);

const annoncesImagesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    annonce_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Annonces',
        required: true,
    },
});

const AnnoncesImage = mongoose.model('AnnoncesImage', annoncesImagesSchema);

const annoncesSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    prix: {
        type: Number,
        required: true,
    },
    students_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AnnoncesImage',
    }],
});

const Annonces = mongoose.model('Annonces', annoncesSchema);

app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/posts', upload.single('image'), async (req, res) => {
    console.log('Received request:', req.body);
    const { titre, description, prix, students_id } = req.body;

    console.log('Titre:', titre);
    console.log('ID:', students_id);
    console.log('Prix:', prix);
    console.log('Description:', description);

    try {
        const annonce = new Annonces({
            titre,
            description,
            prix,
            students_id: new ObjectId(students_id),
        });

        if (req.file) {
            const image = new AnnoncesImage({
                name: req.file.filename,
                annonce_id: annonce._id,
            });
            await image.save();
            annonce.images.push(image._id);
        }

        await annonce.save();

        res.status(201).json({ message: 'successful' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'failed' });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { login, email, password, admin } = req.body;
        const student = new Student({ login, email, password, admin });
        await student.save();

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/login', async (req, res) => {
    console.log("All user logins:", await Student.find({}, 'login password'));
    try {
        const { login, password } = req.body;
        console.log(req.body);

        const student = await Student.findOne({ login });

        if (!student) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        if (password === student.password) {
            res.status(200).json({ message: 'Login successful', user: student });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

app.get('/profile/:login', async (req, res) => {
    try {
        const { login } = req.params;
        const student = await Student.findOne({ login });

        if (!student) {
            res.status(404).json({ error: 'Profile not found' });
            return;
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

app.get('/posts/:username', async (req, res) => {
    try {
        const { username } = req.params;

        const student = await Student.findOne({ login: username });

        if (!student) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const posts = await Annonces.aggregate([
            { $match: { students_id: student._id } },
            {
                $lookup: {
                    from: 'annonces_images',
                    localField: '_id',
                    foreignField: 'annonce_id',
                    as: 'images',
                },
            },
            {
                $addFields: {
                    images: {
                        $map: {
                            input: "$images",
                            in: { _id: "$$this._id", name: "$$this.name" }
                        }
                    }
                }
            }
        ]);

        console.log("Posts:", posts);
        res.status(200).json(posts);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: 'Failed to fetch user posts' });
    }
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await mongoose.connection.db.collection('annonces').find().toArray();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});



app.put('/posts/:postId', upload.single('image'), async (req, res) => {
    const { postId } = req.params;
    const { titre, description, prix, students_id } = req.body;

    try {
        const updatedFields = {
            titre,
            description,
            prix,
            students_id: new ObjectId(students_id),
        };

        const existingPost = await Annonces.findById(postId);

        if (!existingPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        existingPost.set(updatedFields);

        if (req.file) {
            const image = new AnnoncesImage({
                name: req.file.filename,
                annonce_id: existingPost._id,
            });
            await image.save();
            existingPost.images.push(image._id);
        }

        await existingPost.save();

        res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
});

app.get('/posts/:_id', async (req, res) => {
    console.log("test");
    try {
        const { _id } = req.params;

        const post = await Annonces.findById(_id).populate('images');

        if (!post) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }

        res.status(200).json(post);
    } catch (error) {
        console.log("k");
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
