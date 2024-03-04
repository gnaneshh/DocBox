import React from "react";

const AllUsers = ({ data }) => {
  return (
    <div>
      {data.map((user) => {
        return (
          <li>
            {user.userName} {user.userPass}
          </li>
        );
      })}
    </div>
  );
};

export default AllUsers;
