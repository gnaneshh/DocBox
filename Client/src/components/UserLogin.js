import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHomePage } from "../slice/appSlice";
const UserLogin = (props) => {
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle button click of login form
  const handleLogin = () => {
    if (!userName || !userPass) {
      setError(true);
      setErrorMessage("UserName/Password cannot be Empty!");
      return;
    }
    fetch("http://localhost:5050/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        userName,
        userPass,
        userType: "user",
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === "OK") {
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("userType", "user");
          navigate("/dashboard");
          dispatch(setHomePage(false));
        } else if (data.status === "Invalid User!") {
          setError(true);
          setErrorMessage(
            "Incorrect Password/ Try a different UserName if you are a New User"
          );
        }
      })
      .catch((e) => {
        console.log("Unknown Error");
      });
  };

  return (
    <div>
      User Login
      <br />
      <br />
      <div>
        Username
        <br />
        <input
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        Password
        <br />
        <input
          type="password"
          onChange={(e) => setUserPass(e.target.value)}
          value={userPass}
        />
      </div>
      {error && (
        <>
          <small style={{ color: "red" }}>{errorMessage}</small>
          <br />
        </>
      )}
      <br />
      <input type="button" onClick={handleLogin} value="Login" />
      <br />
    </div>
  );
};

export default UserLogin;
