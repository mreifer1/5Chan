import React from 'react';
import PostList from '../components/postList';
import Navbar from '../components/Navbar';

const Home = ({ posts, onCreatePost, onDeletePost, addComment, onUpvote, onDownvote }) => {
  return (
    <div>
      <Navbar onCreatePost={onCreatePost}/>
      <div className='pageText'>
        <h2 className='homepage'>Home Page</h2>
      </div>
      <PostList posts={posts} onDeletePost={onDeletePost} addComment={addComment} onUpvote={onUpvote} onDownvote={onDownvote} />
    </div>
  );
}
export default Home;
