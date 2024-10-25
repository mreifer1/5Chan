import React from 'react';

function PostList({ posts }) {
  return (
    <div class="postList">
      <h2 style={{color: 'white'}}>Posts:</h2>
        {posts.map((post) => (
          <li key={post.id} className='postItem'>
            <div className ="inListPost">
            <h3 className='inPostTitle'>{post.title}</h3>
            <p className='inPostauthor'>Author: {post.author}</p>
            <p className='inPostText'>{post.text}</p>
            </div>
          </li>
        ))}
    </div>
  );
}

export default PostList;
