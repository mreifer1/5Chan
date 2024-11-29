import PostComment from '../../pages/Comment';
import './postList.css';


function PostList({ posts, onDeletePost, addComment, onUpvote, onDownvote }) {


  return (
    <div className="DisplayPosts"> 
    <div className="postList">
      <h2 style={{color: 'white'}}> Recent Posts:</h2>
        {posts.map((post) => (
          <div key={post._id} className='postItem'>


          <div className="postHeader">
            <span className="postAuthor">Author: {post.author || 'Anonymous'}</span>
          </div>
         
          {/* Post Content */}
          <div className="postContent">
          <h3>{post.title}</h3>
          <p>{post.text}</p>


            {post.image && (
              <img
              src={`http://localhost:5555/posts/${post._id}/image`}
              alt={post.image.originalName || '5Chan Post'}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }}
              />
            )}
            </div>
           
            {/* Post Actions */}
            <div className="postActions">
            <div className="voteButtons">
              <div className="voteButton upvote" onClick={() => onUpvote(post._id)}>
                ▲ 
              </div>
              <span>{post.vote}</span>
              <div className="voteButton downvote" onClick={() => onDownvote(post._id)}>
                ▼
              </div>
              <div className="DeleteButton">
            <span onClick={() => onDeletePost(post._id)}>🗑️ Delete</span>
            </div>
            </div>

            <PostComment
              postId={post._id} // Correctly pass postId
              comments={post.comments || []} // Ensure comments is an array
              addComment={addComment}
            />
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default PostList;