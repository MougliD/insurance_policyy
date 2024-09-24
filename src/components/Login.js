import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../component_css/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isUsernameValid =
      username.length >= 3 && /^[a-zA-Z0-9]+$/.test(username);
    const isPasswordValid = password.length > 0;
    setIsButtonEnabled(isUsernameValid && isPasswordValid);
  }, [username, password]);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (value.length < 3) {
      setUsernameError("Minimum 3 characters need to be entered.");
    } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
      setUsernameError("Username must be alphanumeric.");
    } else {
      setUsernameError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: username, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("sessionToken", data.sessionToken);
        localStorage.setItem("sessionExpiry", Date.now() + 5 * 60 * 1000); // 5 minutes
        navigate("/dashboard", { state: { userId: username } }); // Pass userId as state
      } else {
        if (data.error === "user id is incorrect") {
          setUsernameError(data.error);
        } else if (data.error === "password is incorrect") {
          setPasswordError(data.error);
        }
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              className="form-control"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
            {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          </div>
          <button
            type="submit"
            className="btn btn-success"
            disabled={!isButtonEnabled}
          >
            Login
          </button>
          <div className="form-group">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
