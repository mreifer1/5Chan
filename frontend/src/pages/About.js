import Navbar from "../components/Navbar";
import React from 'react'

const About = ( {onCreatePost}) => {
  return (
    <div>
        <Navbar onCreatePost={onCreatePost}/>
        <div className='pageText'>
            <h2>About Page</h2>
            <p>5Chan is an amazing and 100% original forum where anyone can post whatever useless nonsense you like!</p>
        </div>
    </div>
  )
}

export default About
