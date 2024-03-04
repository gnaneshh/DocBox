import React, { useEffect, useState } from "react";

const UserInfo = ({ data }) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    setDocs(data.userDocuments);
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    fetch("http://localhost:5050/uploadDoc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        file: file.name,
      }),
    })
      .then((newData) => newData.json())
      .then((newData) => {
        setDocs(newData.data.userDocuments);
      });
  };
  return (
    <div className="userBoard">
      <h2>Welcome {data.userName}</h2>
      <input
        className="fileInput"
        type="file"
        onChange={handleFileUpload}
      ></input>
      <div>
        {docs.map((fileName, index) => (
          <li key={index}>{fileName}</li>
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
