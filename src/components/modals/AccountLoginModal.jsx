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

  const handleChange = (event) => {
    let { name, value } = event.target

    switch (name) {
      case 'username':
        if(!value.length) setErrors({...errors, usernameInputError: "Username is a required field."});
        else setErrors({...errors, usernameInputError: "", finalCheckError: ""});

        setUsername(value);

        break;
      case 'password':
        if(!value.length) setErrors({...errors, passwordInputError: "Password is a required field."});
        else setErrors({...errors, passwordInputError: "", finalCheckError: ""});

        setPassword(value);

        break;
      default:
        break;
    };
  }

  const logInToApp = (event) => {
    event.preventDefault();

    if (!username || errors.usernameInputError) setErrors({...errors, usernameInputError: "Username is a required field.", finalCheckError: "Please fill in the required field(s)."});
    else if (!password || errors.passwordInputError) setErrors({...errors, passwordInputError: "Password is a required field.", finalCheckError: "Please fill in the required field(s)."});
    else if (!errors.usernameInputError && !errors.passwordInputError) {

      const loginObj = {
        username: username,
        password: password
      };

      fetch("https://prompt-backend.herokuapp.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginObj)
      })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.message) setErrors({...errors, finalCheckError: `${jsonRes.message}`});
        else setToken(jsonRes.token);
      })
      .catch(err => setErrors({...errors, finalCheckError: `${err.message}`}))
    };
  }

  if (!loginClicked) return null;
  return createPortal(
    <div className="modal-overlay" onClick={handleLogin}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-top">
          <span className="modal-title">Log In To Account</span>
          <div className="modal-close" onClick={handleLogin}>x</div>
        </div>

        <div className="modal-body">
          <label htmlFor="username">
            Username:
            <input id="username-input" name="username" type="text" value={username} onChange={handleChange}/>
          </label>
          {errors.usernameInputError ? <span className="modal-error-message">{errors.usernameInputError}</span> : <></>}
          
          <label htmlFor="password">
            Password:
            <input id="password-input" name="password" type="password" value={password} onChange={handleChange}/>
          </label>
          {errors.passwordInputError ? <span className="modal-error-message">{errors.passwordInputError}</span> : <></>}
          {errors.finalCheckError ? <span className="modal-error-message">{errors.finalCheckError}</span> : <></>}
        </div>
        
        <div className = "modal-bottom">
          <button className="modal-create" onClick={logInToApp}>Login</button>
          <button className="modal-cancel" onClick={handleLogin}>Cancel</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default AccountLoginModal;