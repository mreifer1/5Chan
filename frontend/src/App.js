import React, { useState, useEffect } from 'react';
import PostFormModal from './components/createPostModal';
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom';
import About from './pages/About';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import NoPage from './pages/NoPage';

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

  const handleDeletePost = async (id) => {
    const url = `http://localhost:5555/posts/${id}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      setPosts(posts.filter(post => post._id !== id)); // filter the posts NOT using the ones which we want to delete (cleaner syntax) - Ask me (Michael) If you need explanation
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const addComment = async(postId, {text, author}) => {
    const newComment = {text, author};

    try{
      //Backend Code
    } catch(error) {
      console.error('Error in adding comment: ', error);
    }
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

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route>
      <Route index element={<Home posts={posts} onCreatePost={handleCreatePost} onDeletePost={handleDeletePost} addComment={addComment}/>}/>
      <Route path='/home' element={<Home posts={posts} onCreatePost={handleCreatePost} onDeletePost={handleDeletePost}/>}/>
      <Route path='/about' element={<About />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/login' element={<LogIn />}/>
      <Route path='*' element={<NoPage />}/>
    </Route>
    )
  );
    
  return (
    <div className="App">
      <RouterProvider router = {router} />;
      <PostFormModal isOpen={isModalOpen} onClose={handleClosePost} addPost={addPost} />
    </div>
  );
}

export default App;
