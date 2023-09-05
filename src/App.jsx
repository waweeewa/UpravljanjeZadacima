import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import React, {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import TaskTable from './components/pages/TaskTable.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import CommentTable from './components/pages/CommentTable';
import RegistrationPage from './components/pages/RegistrationPage';
import UserProfile from './components/pages/UserProfile';
import Workers from './components/pages/Workers';
import './App.css';



function SignOut({ handleSignOut }) {
  useEffect(() => {
    handleSignOut();
  }, [handleSignOut]);

  return <Navigate to="/" replace />;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [user_id, setUserID] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      const storedUsername = localStorage.getItem('username');
      const storedID = localStorage.getItem('user_id');
      setUsername(storedUsername);
      setUserID(storedID);
    }
  }, []);

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {loggedIn && <Header loggedIn={loggedIn} username={username} handleSignOut={handleSignOut} />}
      <Routes>
        {loggedIn ? (
          <>
            <Route path="/workers" element={<Workers/>} />
            <Route path="/dashboard" element={<TaskTable />} />
            <Route path="/comments/:commentid" element={<CommentTable />} />
            <Route path="/profile/:commentid" element={<UserProfile/>} />
            <Route path="/signout" element={<SignOut handleSignOut={handleSignOut} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <>
            <Route
              path="/login"
              element={<LoginPage setLoggedIn={setLoggedIn} handleLogin={handleLogin} />}
            />
            <Route path="/registration" element={<RegistrationPage/>} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;