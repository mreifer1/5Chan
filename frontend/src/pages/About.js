import Navbar from "../components/Navbar/Navbar";
import React from 'react'
import './About.css'
const About = ( {onCreatePost}) => {
  return (
    <div>
        <Navbar onCreatePost={onCreatePost}/>
        <div className='aboutPage'>
            <h2>About 5Chan</h2>
            <p>Welcome to 5chan, a unique blend of two popular platforms, 4chan and Reddit. Our site provides a space for users to create and engage with posts in a completely anonymous environment. Inspired by the open and unfiltered style of 4chan and the voting-based community model of Reddit, 5chan gives users the freedom to share ideas, stories, and discussions with complete privacy.</p>

              
        <h2>Our Mission</h2>
        <p>At 5chan, our mission is to foster a platform where users feel safe to express their thoughts and ideas without revealing their identities. We aim to create a diverse and engaging space where people from all backgrounds can connect, debate, and discover in a way that is unrestricted by personal profiles.</p>
        
        <h2>Features</h2>
        <ul>
          <li><strong>Anonymous Posting:</strong> Share your thoughts without an account or username.</li>
          <li><strong>Upvoting and Downvoting System:</strong> Users can engage with content by upvoting or downvoting posts, helping the community to highlight popular and valued posts.</li>
          <li><strong>Community-driven Content:</strong> Explore a variety of topics created and curated by our community members.</li>
        </ul>
        
        <h2>Guidelines and Safety</h2>
        <p>While 5chan values free expression, we prioritize user safety and a respectful community environment. We have guidelines in place to maintain a healthy and enjoyable space for everyone.</p>
        
        <h2>Join the Community</h2>
        <p>Whether you want to share an idea, tell a story, or just see what others are talking about, 5chan welcomes you. Dive into the community, vote on content, and explore topics that interest you—all with the freedom of anonymity.</p>        
        </div>
    </div>
  )
}

export default About
