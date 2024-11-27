import React, { useState } from 'react';

function PostFormModal({ isOpen, onClose, addPost }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (title.trim() && text.trim()) {
      const formData = new FormData(); 
      formData.append('title', title);      
      formData.append('author', author || 'Anonymous'); 
      formData.append('text', text);        

    if (file) {
      formData.append('file', file);
    }

      //Confirm Login Status (Test) Commented Out because it breaks the rest of this code. Working on fix
      // const token = localStorage.getItem("accessToken");
      // if (token != null){
      //   try{
      //     const response = await fetch('http://localhost:5555/posts', {
      //       method: 'GET',
      //       headers: {'Authorization': `Bearer ${token}`}
      //     });
      //   }catch{
      //     //console.error('Error: ', error);
      //     //setError(error.message);
      //   }
      // }

      //post to backend and saved in mongo (backend must be running)
       try {
         const response = await fetch('http://localhost:5555/posts', {
           method: 'POST',
           body: formData,
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
         setFile(null);
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
          <div className="title">
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter title'
            required
          />
          </div>
          <div className="author">
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder='Enter author (optional)'
          />
          </div>
          <div className ="text">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Enter text'
            required
          />
          <div>
          <input
            type="file"
            accept="image/*"  
            onChange={(e) => setFile(e.target.files[0])} 
          />
          </div>
          <br></br>
          </div>
          <div style={{display: 'flex', gap: '10px'}}>
          <button type="submit">Post</button>
          <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostFormModal;
