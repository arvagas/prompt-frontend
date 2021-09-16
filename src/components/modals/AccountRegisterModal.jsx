// library imports
import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";

const AccountRegisterModal = (props) => {
  const { registerClicked, setRegisterClicked, handleRegister } = props;
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ errors, setErrors ] = useState({
    usernameInputError: "",
    passwordInputError: "",
    confirmPasswordInputError: "",
    finalCheckError: ""
  });

  const handleChange = (event) => {
    let { name, value } = event.target

    switch (name) {
      case 'username':
        if (!value.length) setErrors({...errors, usernameInputError: "Username is a required field."});
        else setErrors({...errors, usernameInputError: "", finalCheckError: ""});

        setUsername(value);

        break;
      case 'password':
        if (!value.length) setErrors({...errors, passwordInputError: "Password is a required field."});
        else setErrors({...errors, passwordInputError: "", finalCheckError: ""});

        setPassword(value);

        break;
      case 'confirm-password':
        if (!value.length) setErrors({...errors, confirmPasswordInputError: "Confirming password is required."});
        else if(value !== password) setErrors({...errors, confirmPasswordInputError: "Does not match current password."});
        else setErrors({...errors, confirmPasswordInputError: "", finalCheckError: ""});

        setConfirmPassword(value);

        break;
      default:
        break;
    };
  }

  const registerUser = (event) => {
    event.preventDefault();

    if (!username || errors.usernameInputError) setErrors({...errors, usernameInputError: "Username is a required field.", finalCheckError: "Please fill in the required field(s)."});
    else if (!password || errors.passwordInputError) setErrors({...errors, passwordInputError: "Password is a required field.", finalCheckError: "Please fill in the required field(s)."});
    else if (!confirmPassword || errors.confirmPasswordInputError) setErrors({...errors, confirmPasswordInputError: "Confirming password is required.", finalCheckError: "Please fill in the required field(s)."});
    else if (!errors.usernameInputError && !errors.passwordInputError && !errors.confirmPasswordInputError) {

      const registerObj = {
        username: username,
        password: password
      };

      fetch("https://prompt-backend.herokuapp.com/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerObj)
      })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.message) setErrors({...errors, finalCheckError: `${jsonRes.message}`});
        else setRegisterClicked(!registerClicked);
      })
      .catch(err => setErrors({...errors, finalCheckError: `${err.message}`}))
    };
  }

  if (!registerClicked) return null;
  return createPortal(
    <div className="modal-overlay" onClick={handleRegister}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-top">
          <span className="modal-title">Register New Account</span>
          <div className="modal-close" onClick={handleRegister}>x</div>
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

          <label htmlFor="confirm-password">
            Confirm Password:
            <input id="confirm-password-input" name="confirm-password" type="password" value={confirmPassword} onChange={handleChange}/>
          </label>
          {errors.confirmPasswordInputError ? <span className="modal-error-message">{errors.confirmPasswordInputError}</span> : <></>}

          {errors.finalCheckError ? <span className="modal-error-message">{errors.finalCheckError}</span> : <></>}
        </div>
        
        <div className = "modal-bottom">
          <button className="modal-create" onClick={registerUser}>Register</button>
          <button className="modal-cancel" onClick={handleRegister}>Cancel</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default AccountRegisterModal;