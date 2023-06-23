import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { authenticated, user } = useContext(AuthContext);
    const { username } = useParams();
    const [profileUser, setProfileUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://localhost:5000/profile/${username}`);
                if (response.ok) {
                    const data = await response.json();
                    setProfileUser(data);
                } else {
                    setProfileUser(null);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [username]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/posts/${username}`);
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                } else {
                    setPosts([]);
                }
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };

        fetchUserPosts();
    }, [username]);

    if (!authenticated) {
        return <p>Please log in to view profiles.</p>;
    }

    if (!profileUser) {
        return <p>This profile doesn't exist.</p>;
    }

    const isOwnProfile = profileUser.login === user.user.login;

    const handleCreatePost = () => {
        navigate('/post');
    };

    const handleEditPost = (postId) => {
        navigate(`/edit/${postId}`);
    };

    const handleDeletePost = (postId) => {
        // Implement your delete post logic here
        console.log('Delete post:', postId);
    };

    return (
        <div>
            <h1>Profile</h1>
            <p>Username: {profileUser.login}</p>
            {isOwnProfile && (
                <div>
                    <p>It's your profile</p>
                    <button onClick={handleCreatePost}>Create New Post</button>
                </div>
            )}

            <h2>Posts</h2>
            {posts.length > 0 ? (
                <div className="container">
                    {posts.map((post) => (
                        <div className="card mb-6" key={post._id}>
                            <div className="row g-0">
                                {post.images.length > 0 && (
                                    <div className="col-md-4">
                                        <img src={`http://localhost:5000/images/${post.images[0].name}`} className="img-fluid rounded-start" alt="" />
                                    </div>
                                )}
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{post.titre}</h5>
                                        <p className="card-text">{post.description}</p>
                                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                        {isOwnProfile && (
                                            <div>
                                                <button onClick={() => handleEditPost(post._id)}>Edit</button>
                                                <button onClick={() => handleDeletePost(post._id)}>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No posts found.</p>
            )}
        </div>
    );
}

export default Profile;
