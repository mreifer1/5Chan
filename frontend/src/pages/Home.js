import React from 'react';
import PostList from '../components/postList';
import Navbar from '../components/Navbar';

const Home = ({ posts, onCreatePost }) => {
  return (
    <div>
      <Navbar onCreatePost={onCreatePost}/>
      <div className='pageText'>
        <h2>Home Page</h2>
      </div>
      <PostList posts={posts} />
    </div>
  );
}

export default Home;
