import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center position-absolute start-50 t-30 -translate-50">
        <h1 className="my-5 header-font"> Ready to Quiz Yourself ?</h1>
        <Link to={"/user"}>
          <button type="button" className="btn btn-dark my-5 fs-4 py-2 px-4">
            Play
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
