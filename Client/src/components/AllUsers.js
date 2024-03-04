import React from "react";

const AllUsers = ({ data }) => {
  console.log(data, "datatatatatat");
  return (
    <div>
      {data.map((user) => {
        return (
          <div>
            <h3>Name: </h3>
            {user.userName}
            <h3>Password: </h3>
            {user.userPass}
            <h3>Documents: </h3>
            {user.userDocuments.map((fileName, index) => (
              <li key={index}>{fileName}</li>
            ))}
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default AllUsers;
