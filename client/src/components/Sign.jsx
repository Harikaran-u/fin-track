import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "../styles/sign.css";

const Sign = () => {
  const [isExistingUser, setExistingUser] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isNotify, setNotify] = useState(false);
  const [warningMsg, setWarningMsg] = useState(
    "Please kindly follow the credential instructions"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/", { replace: true });
    }
  });

  const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{8,16}$/;

  async function createNewUser(userData) {
    const data = JSON.stringify(userData);
    const registerUrl = "https://fin-track-server.onrender.com/user/register";
    const configs = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    };

    const response = await fetch(registerUrl, configs);
    const resdata = await response.json();
    const message = resdata.message;
    const statusCode = response.status;

    switch (statusCode) {
      case 200:
        setNotify(true);
        setWarningMsg(message);
        break;
      case 409:
        setNotify(true);
        setWarningMsg(message);
        break;
      default:
        break;
    }
  }

  async function loginUser(userData) {
    const loginUrl = "http://localhost:8080/user/login";
    const data = JSON.stringify(userData);
    const configs = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    };
    const response = await fetch(loginUrl, configs);
    const resdata = await response.json();

    const message = resdata.message;
    const statusCode = response.status;
    const authToken = resdata.authToken;
    const userId = resdata.userId;
    switch (statusCode) {
      case 200:
        setNotify(true);
        setWarningMsg(message);
        localStorage.setItem("authToken", JSON.stringify(authToken));
        localStorage.setItem("userId", userId);
        navigate("/", { replace: true });
        break;
      case 400:
        setNotify(true);
        setWarningMsg(message);
        break;
      case 401:
        setNotify(true);
        setWarningMsg(message);
        break;
      default:
        break;
    }
  }

  function submitUserData(e) {
    e.preventDefault();
    setNotify(false);

    const isValidUsername = usernameRegex.test(username);
    const isValidPassword = passwordRegex.test(password);

    if (isValidUsername && isValidPassword) {
      const userData = { username, password };
      isExistingUser ? loginUser(userData) : createNewUser(userData);
      // console.log("valid data", userData);
    } else {
      setNotify(true);
    }
    setUsername("");
    setPassword("");
  }

  function updateSigningProcess() {
    setExistingUser((prev) => !prev);
    setUsername("");
    setPassword("");
  }

  return (
    <div className="main-container">
      <form className="sign-form-main-container" onSubmit={submitUserData}>
        <h1 className="form-head">FinTrack</h1>
        <div className="custom-col">
          <label htmlFor="usernameInput" className="username-label">
            Username
          </label>
          <input
            type="text"
            className="user-input"
            id="usernameInput"
            placeholder="Enter username here..."
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
            data-tooltip-id="my-tooltip-multiline"
            data-tooltip-html="Username must be 4 to 16<br/> characters long and include at<br/> least one capital letter and<br/> one_underscore..."
          />
          <label htmlFor="passwordInput" className="username-label">
            Password
          </label>
          <input
            type="password"
            className="user-input"
            id="passwordInput"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            placeholder="Enter password here..."
            data-tooltip-id="my-tooltip-multiline"
            data-tooltip-html="Password must be 8 to 16<br/> characters long and contain<br/> at least one uppercase letter<br/> and one special character<br/> from the set !@#$%^&*_."
          />

          <button className="custom-btn submit-btn">
            {isExistingUser ? "Login" : "Register"}
          </button>
          {isNotify && <p className="custom-msg warning">{warningMsg}</p>}
          <div className="custom-row">
            <p className="custom-msg">
              {isExistingUser ? "New user?" : "Already a user?"}
            </p>
            <span
              className="custom-msg custom-toggle"
              onClick={updateSigningProcess}
            >
              {isExistingUser ? "Register" : "Login"}
            </span>
          </div>
          <Tooltip id="my-tooltip-multiline" place="right-start" />
        </div>
      </form>
    </div>
  );
};

export default Sign;
