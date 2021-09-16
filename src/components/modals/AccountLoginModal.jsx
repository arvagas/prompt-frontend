// library imports
import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";
// context import
import { UserContext } from '../../contexts/UserContext';

const AccountLoginModal = (props) => {
  const { loginClicked, handleLogin } = props;
  const { token, setToken } = useContext(UserContext);
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errors, setErrors ] = useState({
    usernameInputError: "",
    passwordInputError: "",
    finalCheckError: ""
  });

  if (!loginClicked) return null;
  return createPortal(
    <div className="modal-overlay" onClick={handleLogin}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-top">
          <span className="modal-title">Log In To Account</span>
          <div className="modal-close" onClick={handleLogin}>x</div>
        </div>

        <div className="modal-body">
          <label for="username">
            Username:
            <input id="username-input" name="username" type="text" value={username}/>
          </label>
          {errors.usernameInputError ? <span className="modal-error-message">{errors.usernameInputError}</span> : <></>}
          
          <label for="Password">
            Password:
            <input id="password-input" name="password" type="password" value={password}/>
          </label>
          {errors.passwordInputError ? <span className="modal-error-message">{errors.passwordInputError}</span> : <></>}
        </div>
        
        <div className = "modal-bottom">
          <button className="modal-create" onClick={handleLogin}>Login</button>
          <button className="modal-cancel" onClick={handleLogin}>Cancel</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default AccountLoginModal;