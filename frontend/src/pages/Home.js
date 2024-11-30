import React, { useState, useEffect } from 'react';
import Auth from '../components/Authentication/Authorization';
import Navbar from '../components/Navbar/Navbar';
import SearchBar from '../components/SearchBar/SearchBar';
import PostList from '../components/postList/postList';
import PostFormModal from '../components/createPostModal';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch posts on load
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
  }, [])

  // Handle search input change
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Add new post
  const addPost = (post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  // Add comment to a post
  const addComment = async (postId, { text, author }) => {
    const newComment = { text, author };

    try {
      const response = await fetch(`http://localhost:5555/posts/${postId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create comment');
      }

      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? updatedPost : post))
      );
    } catch (error) {
      console.error('Error in adding comment:', error);
    }
  };

  // Upvote post
  const handleUpvote = async (id) => {
    try {
      const response = await fetch(`http://localhost:5555/posts/${id}/upvote`, { method: 'PATCH' });
      if (!response.ok) {
        throw new Error('Failed to upvote');
      }
      const updatedPost = await response.json();
      setPosts((prevPosts) => prevPosts.map((post) => (post._id === id ? updatedPost : post)));
    } catch (error) {
      console.error('Error upvoting post:', error);
    }
  };

  // Downvote post
  const handleDownvote = async (id) => {
    try {
      const response = await fetch(`http://localhost:5555/posts/${id}/downvote`, { method: 'PATCH' });
      if (!response.ok) {
        throw new Error('Failed to downvote');
      }
      const updatedPost = await response.json();
      setPosts((prevPosts) => prevPosts.map((post) => (post._id === id ? updatedPost : post)));
    } catch (error) {
      console.error('Error downvoting post:', error);
    }
  };

  // Delete post
  const handleDeletePost = async (id) => {
    try {
      const response = await fetch(`http://localhost:5555/posts/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleCreatePost = () => {
    setIsModalOpen(true);
  };

  const handleClosePost = () => {
    setIsModalOpen(false);
  };

  const filteredPosts = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <Auth></Auth>
      <Navbar onCreatePost={handleCreatePost} />
      <div className="pageText">
        <h2 className="homepage">Home Page</h2>
      </div>

      <SearchBar onSearch={handleSearch} />

      <PostList
        posts={filteredPosts}
        onDeletePost={handleDeletePost}
        addComment={addComment}
        onUpvote={handleUpvote}
        onDownvote={handleDownvote}
      />

      <PostFormModal  isOpen={isModalOpen} onClose={handleClosePost} addPost={addPost} />
    </div>
  );
};

export default Home;