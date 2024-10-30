import React from 'react';
import DeletePost from '../pages/DeletePost';
import Upvote from '../pages/Upvote';

function PostList({ posts, onDeletePost }) {
  return (
    <div className="postList">
      <h2 style={{color: 'white'}}>Posts:</h2>
        {posts.map((post) => (
          <div key={post._id} className='postItem'>
            <div className ="inListPost">
            <h3 className='inPostTitle'>{post.title}</h3>
            <p className='inPostauthor'>Author: {post.author}</p>
            <p className='inPostText'>{post.text}</p>
              {/* Going to add functionality for up/down voting */}
            <p className='inPostVote'>
              Score: 1(placeholder)
            </p>
            <DeletePost  id={post._id} onDelete={onDeletePost}/>
            </div>
          </div>
        ))}
    </div>
  );
}

export default PostList;
