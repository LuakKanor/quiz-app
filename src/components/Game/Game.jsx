import axios from "axios";
import React, { useEffect, useState } from "react";
import Quiz from "./Quiz";
import "./Game.css";

const Game = ({ gameSettings, setScore, setTotalScore }) => {
  const [loading, setLoading] = useState(false);
  const [questionsList, setQuestionsList] = useState(null);

  const getGameQuestions = async () => {
    try {
      setLoading(true);
      let url = import.meta.env.VITE_QUIZ_QUESTIONS_API;
      if (gameSettings.noOfQuestions) {
        url += `?amount=${gameSettings.noOfQuestions}`;
      }
      if (gameSettings.category) {
        url += `&category=${gameSettings.category}`;
      }
      if (gameSettings.difficulty) {
        url += `&difficulty=${gameSettings.difficulty}`;
      }
      if (gameSettings.type) {
        url += `&type=${gameSettings.type}`;
      }
      const response = await axios.get(url);
      console.log("response ", response);
      if (response && response.data) {
        setQuestionsList(response.data.results);
        setTotalScore(response.data.results?.length);
      } else {
        setQuestionsList(null);
        setTotalScore(0);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getGameQuestions();
  }, []);

  // render mcq or true/false based on type in game settings
  // if type was any, we will look at type from response
  // if (type is mcq) => /gameMCQ else /gameTF

  if (loading === true) {
    return (
      <>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Quiz questionsList={questionsList} setScore={setScore} />
    </>
  );
};

export default Game;
