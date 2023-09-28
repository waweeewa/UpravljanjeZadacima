import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginPage.css';

const LoginPage = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost/Upravljanje/src/components/functions/Login.php',
        { username, password }
      );

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('user_id', response.data.user_id)
        setLoggedIn(true);
        navigate('/dashboard');
      } else {
        setNotification({ type: 'error', message: 'Invalid credentials' });
      }
    } catch (error) {
      console.log('An error occurred', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000); // Hide notification after 3 seconds

    return () => clearTimeout(timer);
  }, [notification]);

  const handleRegistration = () => {
    navigate('/registration');
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
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-xl-10">
          <div className="card rounded-3 text-black">
            <div className="row g-0">
              <div className="col-lg-6">
                <div className="card-body p-md-5 mx-md-4">
                  <div className="text-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                      style={{ width: '185px' }}
                      alt="logo"
                    />
                    <h4 className="mt-1 mb-5 pb-1">This is the project</h4>
                  </div>
                  <form onSubmit={handleLogin}>
                  {notification && notification.type === 'error' && (
    <div className="custom-notification error">
      {notification.message}
    </div>
  )}
                    <p>Please login to your account</p>
                    <div className="form-outline mb-4">
                      <input
                        type="username"
                        id="form2Example11"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form2Example22"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="text-center pt-1 mb-5 pb-1">
                      <button
                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                        type="submit"
                        style={{ fontSize: '1.2 em', padding: '12px 24px' }} // Adjust font size and button padding
                      >
                        Log in
                      </button>
                    </div>
                    <div className="d-flex align-items-center justify-content-center pb-4">
                      <p className="mb-0 me-2">Don't have an account?</p>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={handleRegistration}
                      >
                        Create new
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  <h4 className="mb-4">This is a good project</h4>
                  <p className="small mb-0">
                    Embark on an adventure through diverse landscapes and encounter unique creatures. Experience the thrill of discovery, from hidden oases to ancient lighthouses. Let the melodies of nightingales and the scent of blooming jasmine accompany your journey. Every moment is an adventure waiting to unfold.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;