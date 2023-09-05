
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordchec, setPasswordChec] = useState('')
  const navigate = useNavigate();

  // Function to handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password === passwordchec) {
      try {
        const response = await axios.post(
          'http://localhost/Upravljanje/src/components/functions/Register.php',
          {
            username: username,
            password: password,
          }
        );
  
        if (response.data.message) {
          alert(response.data.message);
          navigate('/login');
        } else {
          navigate('/login'); // Navigate to the dashboard page
        }
      } catch (error) {
        console.log('An error occurred', error);
      }
    } else {
      alert('Inputed passwords are not the same');
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleRegister}>
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
        <div>
            <label htmlFor='password'>Password Check</label>
            <input
                type="password"
                id="passwordchec"
                value={passwordchec}
                onChange={(e) => setPasswordChec(e.target.value)}
            />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};


export default RegistrationPage;