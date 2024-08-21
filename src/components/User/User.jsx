import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./User.css";
const User = ({ username, setUsername }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const handleVerifyAndNavigate = (e) => {
    // This checks 3 at once
    // username !== "" and username !== null and username !== undefined
    if (!username) {
      setError("Please enter your Name");
      return;
    }

    setError(null);
    navigate("/settings");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleVerifyAndNavigate();
    }
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center position-absolute start-50 t-30 -translate-50">
        <h1 className="my-5 header-font">Enter your Name</h1>
        <div className="d-flex gap-4">
          <input
            className="form-control me-2 name-input"
            type="text"
            placeholder="Name"
            aria-label="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="btn btn-dark"
            type="button"
            onClick={handleVerifyAndNavigate}
          >
            Enter
          </button>
        </div>
        {error ? (
          <>
            <p className="mt-4 bg-danger text-light px-2 py-1">{error}</p>
          </>
        ) : null}
      </div>
    </>
  );
};

export default User;
