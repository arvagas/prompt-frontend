// library imports
import React, { useContext } from 'react';
import jwt_decode from 'jwt-decode';
// context imports
import { UserContext } from '../../contexts/UserContext';

const AccountBar = () => {
  const { token, setToken } = useContext(UserContext);

  const handleLogout = (event) => {
    event.preventDefault();
    setToken("");
  }

  return (
    <div className="top-bar">
      {!token ? (
        <>
          <button className="modal-login">Login</button>
          <button className="modal-register">Register</button>
        </>
      ) : (
        <>
          <h3>Welcome, {jwt_decode(token).username}</h3>
          <button className="modal-logout" onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  )
}

export default AccountBar;