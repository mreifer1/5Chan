import React from 'react';

const DeleteComment = ({ postId, commentId, onDeleteComment }) => {
  const handleDeleteComment = () => {
    onDeleteComment(postId, commentId);
  };

  return (
    <button onClick={handleDeleteComment} className="delete-comment-button">
      Delete Comment
    </button>
  );
};

export default DeleteComment;