import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost/Upravljanje/src/components/functions/Login.php`,
        formData
      );
      console.log(response.data);
      if (response.data.success) {
        // If the credentials are correct, save the token in local storage
        localStorage.setItem('token', response.data.token);
        setLoggedIn(true);
        navigate('/dashboard'); // Navigate to the dashboard page
      } else {
        console.log('Invalid credentials');
      }
    } catch (error) {
      console.log('An error occurred', error);
    }
  };

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
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;