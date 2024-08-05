// src/pages/LoginPage.js
import React, { useState, useCallback } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../assets/css/login.style.css";
import userLogo from "../assets/images/userIcon.jpg";
import Baselayout from "../components/layout/Baselayout";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Api from "../network/Api";
import { METHOD_TYPE } from "../network/methodType";
// import axiosClient from "../network/axiosClient";

function HandleLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const userList = await userApi.getAll();
  //     setUsers(userList);
  //   };
  //   fetchUser();
  // }, []);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const userList = await Api({
  //         endpoint: "https://667943a618a459f6394ee5b4.mockapi.io/login",
  //         method: METHOD_TYPE.POST,
  //         data: {
  //           email: username,
  //           passWord: password,
  //         },
  //       });
  //       console.log(userList);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);
  // const users = useMemo(
  //   () => [
  //     { username: "1", password: "1" },
  //     { username: "2", password: "2" },
  //   ],
  //   []
  // );
  const validateFields = useCallback(() => {
    const errors = {};

    if (username === "") {
      errors.username = "Username cannot be empty";
    }
    if (password === "") {
      errors.password = "Password cannot be empty";
    }

    return errors;
  }, [username, password]);

  const handleLogin = useCallback(async () => {
    const errors = validateFields();
    setErrorMessages(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const response = await Api({
        endpoint: "https://667943a618a459f6394ee5b4.mockapi.io/login",
        method: METHOD_TYPE.POST,
        data: {
          username: username,
          password: password,
        },
      });
      const { token } = response;
      console.log(response.username);
      if (token) {
        Cookies.set("token", token);
        navigate("/");
      }
    } catch (error) {
      setErrorMessages({ login: "Invalid username or password" });
    }
  }, [navigate, username, password, validateFields]);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    if (errorMessages.username || errorMessages.login) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        username: "",
        login: prevErrors.login ? "" : prevErrors.login,
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (errorMessages.password || errorMessages.login) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        password: "",
        login: prevErrors.login ? "" : prevErrors.login,
      }));
    }
  };

  const handleUsernameBlur = () => {
    const errors = validateFields();
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      username: errors.username || "",
    }));
  };

  const handlePasswordBlur = () => {
    const errors = validateFields();
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      password: errors.password || "",
    }));
  };

  const handleUsernameFocus = () => {
    if (username === "") {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        username: "Username cannot be empty",
      }));
    }
  };

  const handlePasswordFocus = () => {
    if (password === "") {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        password: "Password cannot be empty",
      }));
    }
  };
  const handleOnkeydown = useCallback(
    (event, passwordFieldId) => {
      if (event.key === "Enter") {
        const passwordField = document.getElementById(passwordFieldId);
        if (passwordField) {
          passwordField.focus();
        } else {
          handleLogin();
        }
      }
    },
    [handleLogin]
  );
  return (
    <>
      <Baselayout showLogin={false}>
        <h1>Login form</h1>
        <div className="loginFormBox">
          <div id="loginForm" className="loginForm">
            <div className="userImageBox">
              <div>
                <img src={userLogo} alt="User" className="userImage" />
              </div>
            </div>
            <label htmlFor="username">Username</label>
            <InputField
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              erromessages={errorMessages}
              onBlur={handleUsernameBlur}
              onFocus={handleUsernameFocus}
              onChange={handleUsernameChange}
              className={
                errorMessages.username || errorMessages.login
                  ? "error-border"
                  : "correct-border"
              }
              onKeyPress={(e) => handleOnkeydown(e, "password")}
            />
            <p className="error">{errorMessages.username}</p>
            <label htmlFor="password">Password</label>
            <InputField
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              errormessages={errorMessages}
              onBlur={handlePasswordBlur}
              onFocus={handlePasswordFocus}
              onChange={handlePasswordChange}
              className={
                errorMessages.password || errorMessages.login
                  ? "error-border"
                  : "correct-border"
              }
              onKeyPress={(e) => handleOnkeydown(e)}
            />
            <p className="error">{errorMessages.password}</p>
            <p className="error">{errorMessages.login}</p>
            <Button className="submit" onClick={handleLogin}>
              Submit
            </Button>
          </div>
        </div>
      </Baselayout>
    </>
  );
}

const LoginPage = React.memo(HandleLoginPage);
export default LoginPage;
