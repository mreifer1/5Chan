import React from 'react';

function PostList({ posts }) {
  return (
    <div>
      <h2>Posts:</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;