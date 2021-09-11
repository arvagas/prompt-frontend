// library imports
import React, { useContext } from 'react';
import jwt_decode from 'jwt-decode';
// component imports
import Month from './calendar/Month';
// context imports
import { UserContext } from '../contexts/UserContext';

const LandingPage = () => {
  const { token, setToken } = useContext(UserContext);

  const handleLogout = (event) => {
    event.preventDefault();
    setToken("");
  }

  return (
    <div>
      {!token ? 
        <div className="top-bar">
          <button>Login</button>
          <button>Register</button>
        </div>
      : 
        <div className="top-bar">
          <h3>Welcome, {jwt_decode(token).username}</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      }
      <Month />
    </div>
  );
};

export default LandingPage;