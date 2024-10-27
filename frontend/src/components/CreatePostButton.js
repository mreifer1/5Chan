import React from 'react';

const CreatePostButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="create-post-button">
      Create Post
    </button>
  );
};

export default CreatePostButton;
