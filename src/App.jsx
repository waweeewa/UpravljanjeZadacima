import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import TaskTable from './components/pages/TaskTable.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import './App.css'

function SignOut({ handleSignOut }) {
  useEffect(() => {
    handleSignOut(); // Call the handleSignOut function when the component mounts
  }, []);

  return <Navigate to="/" replace />;
}

function LoggedIn()
{
  return <Navigate to="/dashboard" replace />;
}
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername);
      LoggedIn();
    }
  }, []);

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {loggedIn ? (
          <>
            <Route path="/dashboard" element={<TaskTable />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LoginPage setLoggedIn={setLoggedIn} />} />
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <LoginPage setLoggedIn={setLoggedIn} handleLogin={handleLogin} />
                )
              }
            />
          </>
        )}
        <Route path="/signout" element={<SignOut handleSignOut={handleSignOut} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
