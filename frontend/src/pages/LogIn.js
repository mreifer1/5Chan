import Navbar from "../components/Navbar";
import React, {useState} from 'react'
import './SignUp.css';

const LogIn = () => {
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
            await fetch('http://localhost:5555/user/login', {
              method: 'POST',
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(user)
            }).then(() => {
              if (Response.status == 200){
                console.log("Login Successful");
              }
              else{
                console.log("Login Failed");
            }
            })
          } catch(error) {
            console.error('Error: ', error);
            setError(error.message);
          }
        }
    return (
        <div>
            <Navbar />
            <div className='pageText'>
                <h2>Log In Page</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required/><br></br>
                    <label htmlFor="email">E-mail: </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/><br></br>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required/><br></br>
                    <button type="submit">Log In</button>
                  </div>
                </form>
            </div>
        </div>
    )
}




export default LogIn