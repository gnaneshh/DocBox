import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import axios from "axios";

import { getToken, removeUserSession, setUserSession } from "./utils/common";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import DashBoard from "./pages/DashBoard";
import { useSelector } from "react-redux";

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const { isHome } = useSelector((store) => store.app);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(`http://localhost:4000/verifyToken?token=${token}`)
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
        setAuthLoading(false);
      })
      .catch((error) => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>;
  }

  return (
    <BrowserRouter>
      {isHome && (
        <div className="header">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/ulogin"
          >
            User Login
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/alogin"
          >
            Admin Login
          </NavLink>
          {/* <small>(Access with token only)</small> */}
        </div>
      )}
      <div className="content">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/ulogin" element={<UserLogin />} />
          <Route path="/alogin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
