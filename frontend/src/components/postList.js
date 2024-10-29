import React from 'react';

function PostList({ posts }) {
  return (
    <div className="postList">
      <h2 style={{color: 'white'}}>Posts:</h2>
        {posts.map((post) => (
          <div key={post._id} className='postItem'>
            <div className ="inListPost">
            <h3 className='inPostTitle'>{post.title}</h3>
            <p className='inPostauthor'>Author: {post.author}</p>
            <p className='inPostText'>{post.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default PostList;
