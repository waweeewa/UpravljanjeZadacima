import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginPage.css';

const LoginPage = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost/Upravljanje/src/components/functions/Login.php',
        { username, password } // Send username and password as an object
      );
      console.log(response.data)
      if (response.data.success) {
        // If the credentials are correct, save the token in local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('user_id', response.data.user_id)
        setLoggedIn(true);
        navigate('/dashboard'); // Navigate to the dashboard page
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.log('An error occurred', error);
    }
  };

  const handleReg = async (e)=>{
    e.preventDefault();
    try{
      navigate('/registration');
    }
    catch (error){
      console.log('An error occured', error);
    }
  }

  // Check if a token exists in local storage
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      // Redirect to a different page if the user is already logged in
      navigate('/dashboard');
    }
  }, [token, navigate]);

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:   </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:   </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button type="submit" class="button">Login</button>
          <button onClick={handleReg} class="button">Registration</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;