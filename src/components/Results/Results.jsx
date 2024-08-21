import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Results = ({ username, score, totalScore, setScore }) => {
  const navigate = useNavigate();
  const handleNavigation = (link) => {
    setScore(0);
    navigate(link);
  };
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1 className="my-5 header-font-medium">
          Well played {username}, Your score is : {score} out of {totalScore}
        </h1>
        <div className="d-flex flex-wrap gap-5">
          <button
            type="button"
            className="btn btn-dark my-5 py-2 px-4"
            onClick={() => handleNavigation("/settings")}
          >
            Try Again
          </button>

          <button
            type="button"
            className="btn btn-dark my-5 py-2 px-4"
            onClick={() => handleNavigation("/")}
          >
            Quit
          </button>
        </div>
      </div>
    </>
  );
};

export default Results;
