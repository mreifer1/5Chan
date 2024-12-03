import React, { useState } from "react";
import DeleteComment from '../DeleteComment'; // Adjust the import path as needed
import './Comment.css'

function PostComment({ postId, comments, addComment, onDeleteComment }) {
  const [isCommentBoxVisible, setCommentBoxVisible] = useState(false);
  const [text, setCommentText] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim()) {
      try {
        await addComment(postId, { text, author });
        setCommentText('');
        setAuthor('');
        setCommentBoxVisible(false);
      } catch (error) {
        console.error('Error in adding comment:', error);
      }
    }
  };

  return (
    <div>
      {!isCommentBoxVisible && (
        <button className="bottomGap" onClick={() => setCommentBoxVisible(true)}>
          Add Comment
        </button>
      )}
      {isCommentBoxVisible && (
        <div className="commentBox">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author (optional)"
          />
          <textarea
            value={text}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Enter your comment"
            required
          />
          <div className="bottomGap">
          <button className="buttonGap" onClick={handleSubmit}>Submit Comment</button>
          <button onClick={() => setCommentBoxVisible(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div>
        <h4>Comments:</h4>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="commentItem">
              <p>{comment.author}: {comment.text}</p>
              <DeleteComment
                postId={postId}
                commentId={comment._id}
                onDeleteComment={onDeleteComment}
              />
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default PostComment;