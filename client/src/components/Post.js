import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function Post() {
    const { user } = useContext(AuthContext);

    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const test = user?.user?._id;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('description', description);
        formData.append('prix', '0');
        formData.append('students_id', test);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:5000/posts', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Post submitted successfully
                console.log('Post submitted successfully');
            } else {
                // Error submitting the post
                console.error('Failed to submit post');
            }
        } catch (error) {
            console.error('Error submitting the post:', error);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    return (
        <div>
            <h1>Create New Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titre:</label>
                    <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Post;
