import Navbar from "../components/Navbar/Navbar";
import React from 'react'

const NoPage = () => {
  return (
    <div>
        <Navbar />
        <div className='pageText'>
            <h2>No Page found: Error 404</h2>
        </div>
    </div>
  )
}

export default NoPage
