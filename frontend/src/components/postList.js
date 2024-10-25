import React from 'react';

function PostList({ posts }) {
  return (
    <div>
      <h2>Posts:</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className='postItem'>
            <h3>{post.title}</h3>
            <p className='author'>Author: {post.author}</p>
            <p className='text'>{post.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
