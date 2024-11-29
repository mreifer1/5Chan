import React, { useState } from 'react';
import './Report.css';

const Report = () => {
  const [email, setEmail] = useState('');
  const [report_text, setReportText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5555/user/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  
        },
        body: JSON.stringify({
          email: email,
          report_text: report_text,
        }),
      });

      if (response.ok) {
        console.log('Report submitted successfully');
      } else {
        console.log('Failed to submit report', response.status);
      }
    } catch (error) {
      console.log('Error submitting report:', error);
    }

    setEmail('');
    setReportText('');
    setIsOpen(false);  
  };

  return (
    <div>
      <button className='report_button' onClick={() => setIsOpen(!isOpen)}>
        Report a problem
      </button>

      <div className={`report_form ${isOpen ? 'show' : ''}`}>
        <h2>Report a problem</h2>
        <input 
          type="text" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
        <textarea
          value={report_text}
          onChange={(e) => setReportText(e.target.value)}
          placeholder="Enter your comment" 
          required 
        />
        <button onClick={handleSubmit}>Submit Comment</button>
      </div>
    </div>
  );
};

export default Report;
