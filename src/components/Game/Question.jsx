import React from "react";
import he from "he";
const Question = ({
  qNo,
  type,
  question,
  optionList,
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div>
          <h1 className="header-font-medium my-5 px-5">
            Question {" " + qNo + " "}: {he.decode(question)}
          </h1>
          <div className="row justify-content-center">
            {optionList?.map((option, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedOption(option);
                  }}
                  className={`col-8 col-md-4 mx-4 my-4 quiz-option option-text option-border ${
                    selectedOption === option
                      ? "text-dark border border-dark selected-option-shadow"
                      : ""
                  }`}
                >
                  {he.decode(option)}
                </div>
              );
            })}
          </div>
        </div>
        {/* <p>Type: {type}</p>
        <ul>
          <li>{he.decode(correctAns)}</li>
          {incorrectAnsList?.map((ans, index) => {
            return <li key={index}>{he.decode(ans)}</li>;
          })}
        </ul> */}
      </div>
    </>
  );
};

export default Question;
