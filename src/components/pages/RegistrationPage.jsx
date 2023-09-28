import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationPage = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password === passwordCheck) {
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
          navigate('/login');
        }
      } catch (error) {
        console.log('An error occurred', error);
      }
    } else {
      alert('Inputed passwords do not match');
    }
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-xl-10">
          <div className="card rounded-3 text-black">
            <div className="row g-0">
              <div className="col-lg-6">
                <div className="card-body p-md-5 mx-md-4">
                  <div className="text-center">
                    <h4 className="mt-1 mb-5 pb-1">Registration Page</h4>
                  </div>
                  <form onSubmit={handleRegister}>
                    <div className="form-outline mb-4">
                      <label htmlFor="username"></label>
                      <input
                        type="text"
                        id="username"
                        className="form-control"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label htmlFor="password"></label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label htmlFor="passwordCheck"></label>
                      <input
                        type="password"
                        id="passwordCheck"
                        className="form-control"
                        placeholder='Confirm Password'
                        value={passwordCheck}
                        onChange={(e) => setPasswordCheck(e.target.value)}
                        required
                      />
                    </div>
                    <div className="text-center pt-1 mb-5 pb-1">
                      <button
                         className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                         type="submit"
                         style={{ fontSize: '1.2 em', padding: '12px 24px' }}
                      >
                        Register
                      </button>
                    </div>
                  </form>
                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Already have an account?</p>
                    <button
                    type='button'
                    className='btn btn-outline-danger'
                    onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>
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
    </div >
  );
};

export default RegistrationPage;