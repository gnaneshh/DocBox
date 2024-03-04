import React from "react";

const UserInfo = ({ data }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(file, "feeel");
  };
  return (
    <div className="userBoard">
      <h2>Welcome {data.userName}</h2>
      <input type="file" onChange={handleFileUpload}></input>
    </div>
  );
};

export default UserInfo;
