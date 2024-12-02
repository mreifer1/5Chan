import React from 'react';

const DeleteComment = ({ postId, commentId, onDeleteComment }) => {
  const handleDeleteComment = () => {
    onDeleteComment(postId, commentId);
  };

  return (
    <span onClick={handleDeleteComment} className="delete-comment-button" role="button" aria-label="Delete Comment">
       Delete 🗑️
    </span>
  );
};

export default DeleteComment;