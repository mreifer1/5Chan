import Navbar from "../../components/Navbar/Navbar";
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const[formData, setFromData] = useState({
    username: '', email: '', password:''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted: ', formData);
    const user = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    };

    try{
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/user`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
      });

      if(!response.ok){
        const errorData = await response.json();
        alert(errorData);
      }

      console.log('new user added')
      alert('Account created. (Being Redirected to Login)')
      navigate('/login');
    } catch(error) {
      console.error('Error: ', error);
      setError(error.message);
    }
  }

  return (
    <div>
        <Navbar />
        <div className='SignUpPage'>
            <h2>Sign Up Page</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" name="username" placeholder="Enter Username" value={formData.username} onChange={handleChange} required/><br></br>
                <label htmlFor="email">E-mail: </label>
                <input type="email" id="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required/><br></br>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required/><br></br>
                <button type="submit">Sign up</button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp
