import React, { useState } from 'react';
import PostFormModal from './createPostModal';
import PostList from './postList';

function App() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addPost = (post) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  const handleCreatePost = () =>{
    setIsModalOpen(true);
  }

  const handleClosePost = () =>{
    setIsModalOpen(false);
  }

  return (
    <div className="App">
      <h1 style={{display: 'flex', justifyContent: 'center'}}>5Chan</h1>
      <button onClick={handleCreatePost}>Create Post</button>
      <PostFormModal isOpen={isModalOpen} onClose={handleClosePost} addPost={addPost} />
      <PostList posts={posts} />
    </div>
  );
}

export default App;
