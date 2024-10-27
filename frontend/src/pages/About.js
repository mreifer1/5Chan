import Navbar from "../components/Navbar";
import React from 'react'

const About = ( {onCreatePost}) => {
  return (
    <div>
        <Navbar onCreatePost={onCreatePost}/>
        <div className='pageText'>
            <h2>About Page</h2>
        </div>
    </div>
  )
}

export default About
