import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Question from "./Question";
import { shuffleArray } from "../../utils/helper";

const Quiz = ({ questionsList, setScore }) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState(null);

  const currentQuestion = quizQuestions
    ? quizQuestions[currentQuestionIndex]
    : null;

  const handleNextQuestion = () => {
    if (!selectedOption) {
      setError("Please select an option");
      return;
    }
    setError(null);
    if (selectedOption === currentQuestion.correct_answer) {
      setScore((score) => score + 1);
    }

    if (currentQuestionIndex === questionsList?.length - 1) {
      navigate("/results");
      return;
    }

    setSelectedOption("");
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex + 1);
  };

  useEffect(() => {
    const updatedQuestions = questionsList?.map((ques, index) => {
      let optionsArray = [...ques.incorrect_answers, ques.correct_answer];
      optionsArray = shuffleArray(optionsArray);
      return {
        ...ques,
        options: optionsArray,
        id: index + 1,
      };
    });
    setQuizQuestions(updatedQuestions);
  }, [questionsList]);

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        {currentQuestion ? (
          <Question
            qNo={currentQuestion.id}
            type={currentQuestion.type}
            question={currentQuestion.question}
            optionList={currentQuestion.options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        ) : null}
        {error ? (
          <>
            <p className="mt-4 bg-danger text-light px-2 py-1">{error}</p>
          </>
        ) : null}
        <button
          type="button"
          className="btn btn-dark my-5 fs-4 py-2 px-4"
          onClick={handleNextQuestion}
        >
          {currentQuestionIndex < questionsList?.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
    </>
  );
};

export default Quiz;
