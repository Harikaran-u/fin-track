import React, { useState } from "react";
import { Tooltip } from "react-tooltip";

const Sign = () => {
  const [isExistingUser, setExistingUser] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function submitUserData(e) {
    e.preventDefault();
    console.log("Event triggered");
  }

  function updateSiginingProcess() {
    setExistingUser((prev) => !prev);
  }

  return (
    <form className="sign-form-main-container" onSubmit={submitUserData}>
      <h1 className="form-head">{isExistingUser ? "Login" : "Register"}</h1>
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

      <button className="custom-btn submit-btn">Submit</button>
      <div className="custom-row">
        <p className="custom-msg">
          {isExistingUser ? "New user?" : "Already a user?"}
        </p>
        <span
          className="custom-msg custom-toggle"
          onClick={updateSiginingProcess}
        >
          {isExistingUser ? "Register" : "Login"}
        </span>
      </div>
      <Tooltip id="my-tooltip-multiline" place="right-start" />
    </form>
  );
};

export default Sign;
