import React, { useState } from 'react';

function PostFormModal({ isOpen, onClose, addPost }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (title.trim() && text.trim()) {
      const post = { title, author, text };
      //post to backend and saved in mongo (backend must be running)
       try {
         const response = await fetch('http://localhost:5555/posts', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(post),
         });

         if (!response.ok) {
           const errorData = await response.json();
           throw new Error(errorData.message || 'Failed to create post');
         }

         const newPost = await response.json();
         addPost(newPost);
         setTitle('');
         setAuthor('');
         setText('');
         setError(null);
         onClose();
       } catch (error) {
         console.error('Error: ', error);
         setError(error.message);
       }
      setTitle('');
      setAuthor('');
      setText('');
      onClose();
    } else {
      setError('Title and text are required.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modalContent">
        <h2>Create Post</h2>
        {error && <div className="error">{error}</div>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div class="title">
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter title'
            required
          />
          </div>
          <div class="author">
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder='Enter author (optional)'
          />
          </div>
          <div class ="text">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Enter text'
            required
          />
          </div>
          <button type="submit">Post</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default PostFormModal;
