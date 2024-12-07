import React, { useState } from 'react';
import './Report.css';

const Report = () => {
  const [email, setEmail] = useState('');
  const [report_text, setReportText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!report_text.trim()) { // gives error if nothing is entered when submitting
      alert('Please enter report text');
      return; }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/user/report`, {
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
          placeholder="Enter your report" 
          required 
        />
        <button onClick={handleSubmit}>Submit Report</button>
      </div>
    </div>
  );
};

export default Report;
