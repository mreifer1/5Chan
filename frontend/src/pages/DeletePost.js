import React from 'react';

const DeletePost = ({ id, onDelete }) => {
  const handleDeleteBook = () => {
    onDelete(id);
  };

  return (
    <button onClick={handleDeleteBook} className="delete-post-button">
      Delete Post
    </button>
  );
};

export default DeletePost;
