import React from 'react';
import DeletePost from '../pages/DeletePost';
import PostComment from '../pages/Comment';

function PostList({ posts, onDeletePost, addComment }) {
  return (
    <div className="postList">
      <h2 style={{color: 'white'}}> Recent Posts:</h2>
        {posts.map((post) => (
          <div key={post._id} className='postItem'>
            <div className ="inListPost">
            <h3 className='inPostTitle'>{post.title}</h3>
            <p className='inPostauthor'>Author: {post.author}</p>
            <p className='inPostText'>{post.text}</p>
            <DeletePost  id={post._id} onDelete={onDeletePost}/>
            <PostComment 
              postID={post._id}
              comments = {post.comments}
              addComment = {addComment}/>
            </div>
          </div>
        ))}
    </div>
  );
}

export default PostList;
