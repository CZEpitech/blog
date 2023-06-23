import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import Post from './components/Post'
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Edit from './components/Edit';

function App() {


  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<Post />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/edit/:postId" element={<Edit />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
