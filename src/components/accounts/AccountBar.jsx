// library imports
import React, { useState, useContext } from 'react';
import jwt_decode from 'jwt-decode';
// component imports
import AccountLoginModal from "../modals/AccountLoginModal";
// context imports
import { UserContext } from '../../contexts/UserContext';

const AccountBar = () => {
  const { token, setToken } = useContext(UserContext);
  const [ loginClicked, setLoginClicked ] = useState(false);
  const [ registerClicked, setRegisterClicked ] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    setLoginClicked(!loginClicked);
  }

  const handleLogout = (event) => {
    event.preventDefault();
    setToken("");
  }

  return (
    <div className="top-bar">
      {!token ? (
        <>
          <button className="modal-login" onClick={handleLogin}>Login</button>
          {loginClicked ? <AccountLoginModal loginClicked={loginClicked} handleLogin={handleLogin} /> : <></>}
          <button className="modal-register">Register</button>
        </>
      ) : (
        <>
          <h3>Welcome, {jwt_decode(token).username}</h3>
          <button className="modal-logout" onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default AccountBar;