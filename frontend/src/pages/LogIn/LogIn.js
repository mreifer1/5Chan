import Navbar from "../../components/Navbar/Navbar";
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './LogIn.css';

const LogIn = () => {
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
      console.log('Login form submitted: ', formData);
      const user = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      };
  
      try{
        const response = await fetch('http://localhost:5555/user/login', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(user),
        });

        if (response.status === 200){
          const data = await response.json();
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.accessToken);
          console.log("Login Successful");
          alert("Login Successful");
          navigate('/home');
        }
        else{
          console.log("Login Failed");
          alert("Login Failed");
        }
      } catch(error) {
        console.error('Error: ', error);
        setError(error.message);
      }
    }
    return (
        <div>
            <Navbar />
            <div className='LogInPage'>
                <h2>Log In Page</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" name="username" placeholder="Enter Username" value={formData.username} onChange={handleChange} required/><br></br>
                    <label htmlFor="email">E-mail: </label>
                    <input type="email" id="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required/><br></br>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required/><br></br>
                    <button type="submit">Log In</button>
                  </div>
                </form>
            </div>
        </div>
    )
}




export default LogIn