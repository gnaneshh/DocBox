import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo";

const UserDashBoard = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const user = window.localStorage.getItem("token");
    fetch("http://localhost:5050/userDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: user,
      }),
    })
      .then((data) => data.json())
      .then((data) => setUserData(data.data));
  }, []);
  return userData ? <UserInfo data={userData} /> : <div>Loading...</div>;
};

export default UserDashBoard;
