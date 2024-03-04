import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHomePage } from "../slice/appSlice";
// import { getUser, removeUserSession } from "../utils/common";

const AdminLogin = (props) => {
  // const history = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!adminName || !adminName) {
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
        userName: adminName,
        userPass: adminPass,
        userKey: adminKey,
        userType: "admin",
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === "OK") {
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("userType", "admin");
          navigate("/dashboard");
          dispatch(setHomePage(false));
        } else if (data.status === "Invalid Admin!") {
          setError(true);
          setErrorMessage("Invalid Admin Key!");
        } else {
          console.log("Existing User");
        }
      })
      .catch((e) => {
        console.log("Unknown Error Client");
      });
  };

  return (
    <div>
      Admin Login
      <br />
      <br />
      <div>
        Username
        <br />
        <input
          type="text"
          onChange={(e) => setAdminName(e.target.value)}
          value={adminName}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        Password
        <br />
        <input
          type="password"
          onChange={(e) => setAdminPass(e.target.value)}
          value={adminPass}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        Admin Key
        <br />
        <input
          type="text"
          onChange={(e) => setAdminKey(e.target.value)}
          value={adminKey}
        />
      </div>
      {error && (
        <>
          <small style={{ color: "red" }}>{errorMessage}</small>
          <br />
        </>
      )}
      <br />
      <button onClick={handleLogin}>Login</button>
      <br />
    </div>
  );
};

export default AdminLogin;
