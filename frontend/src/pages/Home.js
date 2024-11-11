import React, { useState } from 'react';
import PostList from '../components/postList';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';

const Home = ({ posts, onCreatePost, onDeletePost, addComment, onUpvote, onDownvote }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query); // Update search query state
  };

  // Filter posts based on the search query (so we can update post list)
  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.author.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <Navbar onCreatePost={onCreatePost} />
      <div className="pageText">
        <h2 className="homepage">Home Page</h2>
      </div>
      
      <SearchBar onSearch={handleSearch} />
      
      <PostList
        posts={filteredPosts}
        onDeletePost={onDeletePost}
        addComment={addComment}
        onUpvote={onUpvote}
        onDownvote={onDownvote}
      />
    </div>
  );
};

export default Home;
