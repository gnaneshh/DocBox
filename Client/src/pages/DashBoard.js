import React from "react";
import UserDashBoard from "./UserDashBoard";
import AdminDashBoard from "./AdminDashBoard";
import { NavLink } from "react-router-dom";
import { setHomePage } from "../slice/appSlice";
import { useDispatch } from "react-redux";

const DashBoard = () => {
  const dashboardType = window.localStorage.getItem("userType");
  const dispatch = useDispatch();

  return (
    <>
      <div className="header">
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/"
          onClick={(e) => {
            dispatch(setHomePage(true));
          }}
        >
          Sign Out
        </NavLink>
      </div>
      <div className="content">
        {dashboardType === "user" ? <UserDashBoard /> : <AdminDashBoard />}
      </div>
    </>
  );
};

export default DashBoard;
