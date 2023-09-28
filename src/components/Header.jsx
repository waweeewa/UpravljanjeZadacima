import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import "./css/Header.css";

function Header() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve the username from your authentication system or local storage
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  }, []);

  return (
    <div style={{marginBottom:'70px'}} className="martin">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        &nbsp;&nbsp;
        <a className="navbar-brand" href="#">Task management</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link" href="http://localhost:5173/dashboard">
              Home
            </a>
          </div>
          <div className="collapse navbar-collapse justify-content-end">
            <span className="navbar-text mr-3" style={{fontSize:'1.4em'}}>Logged in as: {username}</span>
            &nbsp;&nbsp;
            <a className="nav-link" href="./signout">
              <button className="btn btn-danger"style={{marginRight:'20px'}}>Sign Out</button>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;