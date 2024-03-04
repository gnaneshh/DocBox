import React, { useEffect, useState } from "react";
import AllUsers from "./AllUsers";

const AdminDashBoard = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5050/allUsers")
      .then((data) => data.json())
      .then((data) => {
        console.log(data, "allUsersHJ", typeof data);
        setUserData(data);
      });
  }, []);
  return userData ? (
    <AllUsers data={userData.data} />
  ) : (
    <div>No Record Found...</div>
  );
};

export default AdminDashBoard;
