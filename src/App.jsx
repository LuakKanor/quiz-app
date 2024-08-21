import { useState } from "react";
import Settings from "./components/Settings/Settings";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import User from "./components/User/User";
import Results from "./components/Results/Results";
import Game from "./components/Game/Game";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gameSettings, setGameSettings] = useState({
    noOfQuestions: 10,
    category: "",
    type: "",
    difficulty: "",
  });
  return (
    <>
      <div className="layout">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/user"
              element={<User username={username} setUsername={setUsername} />}
            />
            <Route
              path="/settings"
              element={
                <Settings
                  username={username}
                  setGameSettings={setGameSettings}
                />
              }
            />
            <Route
              path="/game"
              element={
                <Game
                  gameSettings={gameSettings}
                  setScore={setScore}
                  setTotalScore={setTotalScore}
                />
              }
            />
            <Route
              path="/results"
              element={
                <Results
                  username={username}
                  score={score}
                  setScore={setScore}
                  totalScore={totalScore}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
