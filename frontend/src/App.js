import React, { useState, useEffect } from 'react';
import PostFormModal from './components/createPostModal';
import PostList from './components/postList';

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
 // on load fetches posts from backend (backend must be running)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5555/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); // need [] to show empty dependency array so it runs once

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
