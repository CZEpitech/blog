import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function EditPost() {
    const { user } = useContext(AuthContext);
    const { postId } = useParams();
    const navigate = useNavigate();
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const test = user?.user?._id;
    const test2 = user?.user?.login;



    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('description', description);
        formData.append('prix', '0');
        formData.append('students_id', test);
        formData.append('image', image);

        try {
            const response = await fetch(`http://localhost:5000/posts/${postId}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                console.log('Post updated successfully');
                navigate(`/${test2}`);
            } else {
                console.error('Failed to update post');
            }
        } catch (error) {
            console.error('Error updating the post:', error);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    return (
        <div>
            <h1>Edit Post</h1>
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
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditPost;
