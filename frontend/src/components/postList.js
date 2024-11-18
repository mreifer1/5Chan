import DeletePost from '../pages/DeletePost';
import PostComment from '../pages/Comment';


function PostList({ posts, onDeletePost, addComment, onUpvote, onDownvote }) {

  return (
    <div className="postList">
      <h2 style={{color: 'white'}}> Recent Posts:</h2>
        {posts.map((post) => (
          <div key={post._id} className='postItem'>
            <div className ="inListPost">
            <h3 className='inPostTitle'>{post.title}</h3>
            <p className='inPostauthor'>Author: {post.author}</p>
            <p className='inPostText'>{post.text}</p>

            {post.image && (
              <img
                src={`http://localhost:5555/${post.image}`}
                alt=''
                style={{ width: '10%', height: 'auto' }}
              />
            )}
            
            <p>Votes: {post.vote}</p>
              <button onClick={() => onUpvote(post._id)}>Upvote</button>
              <button onClick={() => onDownvote(post._id)}>Downvote</button>

            <DeletePost  id={post._id} onDelete={onDeletePost}/>
            <PostComment 
              comments = {post.comments}
              addComment = {addComment}/>
            </div>
          </div>
        ))}
    </div>
  );
}

export default PostList;
