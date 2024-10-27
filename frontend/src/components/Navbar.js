import React from 'react';
import CreatePostButton from './CreatePostButton'; 
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onCreatePost }) => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h1 className="navbar-title">5Chan</h1>
      <hr className="navbar-divider" />
      <div className="navbar-buttons">
        <CreatePostButton onClick={onCreatePost} />
        <button className="home-button" onClick={() => navigate('/home')}>Home</button>
        <button className="signup-button" onClick={() => navigate('/signup')}>Sign Up</button>
        <button className="about-button" onClick={() => navigate('/about')}>About</button>
      </div>
    </div>
  );
}

export default Navbar;
