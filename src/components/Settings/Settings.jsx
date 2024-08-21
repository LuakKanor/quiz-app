import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

const Settings = ({ username, setGameSettings }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [noOfQuestions, setNoOfQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState("");
  const [quizType, setQuizType] = useState("");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState(null);
  const handleOnClick = (e) => {
    if (noOfQuestions < 1 || noOfQuestions > 50) {
      setError("Please enter value between 1 and 50");
      return;
    }
    setError(null);
    setGameSettings({
      noOfQuestions: noOfQuestions,
      category: category,
      type: quizType,
      difficulty: difficulty,
    });
    navigate("/game");
  };
  const getCategoryList = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_QUIZ_CATEGORY_LOOKUP_API
      );
      if (response && response.data) {
        setCategoryList(response.data.trivia_categories);
      } else {
        setCategoryList(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const difficultyList = [
    {
      id: "easy",
      name: "Easy",
    },
    {
      id: "medium",
      name: "Medium",
    },
    {
      id: "hard",
      name: "Hard",
    },
  ];
  const quizTypeList = [
    {
      id: "multiple",
      name: "Multiple Choice",
    },
    {
      id: "boolean",
      name: "True/False",
    },
  ];
  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1 className="my-5 header-font">
          Welcome {username ? username : ""}, Select your Quiz
        </h1>
        <div className="row">
          <div className="d-flex flex-column justify-content-center align-items-center my-4 col-12 col-md-6">
            <div>
              <label htmlFor="questions">Enter number of questions</label>
              <input
                id="questions"
                className="form-control me-2 name-input"
                type="number"
                aria-label="question"
                min="1"
                max="50"
                required
                value={noOfQuestions}
                onChange={(e) => setNoOfQuestions(e.target.value)}
              />
              {error ? (
                <>
                  <p className="mt-4 bg-danger text-light px-2 py-1">{error}</p>
                </>
              ) : null}
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center my-4 col-12 col-md-6">
            <div>
              <label htmlFor="category">Select Category</label>
              <select
                id="category"
                className="form-select settings-dropdown"
                aria-label="Select Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Any Category</option>
                {categoryList?.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center my-4 col-12 col-md-6">
            <div>
              <label htmlFor="difficulty">Select Difficulty</label>
              <select
                id="difficulty"
                className="form-select settings-dropdown"
                aria-label="Select Difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="">Any Difficulty</option>
                {difficultyList.map((difficulty) => {
                  return (
                    <option key={difficulty.id} value={difficulty.id}>
                      {difficulty.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center my-4 col-12 col-md-6">
            <div>
              <label htmlFor="type">Select Type</label>
              <select
                id="type"
                className="form-select settings-dropdown"
                aria-label="Select Type"
                value={quizType}
                onChange={(e) => setQuizType(e.target.value)}
              >
                <option value="">Any Type</option>
                {quizTypeList.map((quizTypeList) => {
                  return (
                    <option key={quizTypeList.id} value={quizTypeList.id}>
                      {quizTypeList.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-dark my-5 fs-4 py-2 px-4"
          onClick={handleOnClick}
        >
          Play
        </button>
      </div>
    </>
  );
};

export default Settings;
