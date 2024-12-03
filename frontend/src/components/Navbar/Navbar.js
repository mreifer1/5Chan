import React from 'react';
import CreatePostButton from '../CreatePostButton'; 
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onCreatePost }) => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/home"><img src={"/smallLogo.png"} alt="5Chan logo" /></Link>
      <h1 className="navbar-title">5Chan</h1>
      </div>
      <hr className="navbar-divider" />
      <div className="navbar-buttons">
        <CreatePostButton onClick={onCreatePost} />
        <button className="home-button" onClick={() => navigate('/home')}>Home</button>
        <button className="signup-button" onClick={() => navigate('/signup')}>Sign Up</button>
        <button className="login-button" onClick={() => navigate('/login')}>Login</button>
        <button className="about-button" onClick={() => navigate('/about')}>About</button>
      </div>
    </div>
  );
}

export default Navbar;
