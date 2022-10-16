import React, { useState, useEffect } from "react";
import WordDataRapidAPI from "../model/getData";
import randomWords from "../model/randomWords";
import HintModal from "./hintModal";
import { FaBeer } from "react-icons/fa";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import LoadSpinning from "./loadSpinning";

const Main = () => {
  const [correctWord, setCorrectWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [inputWord, setInputWord] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [randomWordsArray, setRandomWordsArray] = useState([]);
  const [similarWords, setSimilarWords] = useState([]);

  useEffect(() => {
    // const randomWord = Math.floor(Math.random() * randomWords.length);
    const randomWordsArray = randomizeArray(randomWords);
    setRandomWordsArray((word) => [...word, randomWordsArray]);
    WordDataRapidAPI(
      randomWordsArray[questionNumber],
      setDefinition,
      setCorrectWord,
      setSimilarWords
    );
  }, []);

  const randomizeArray = (randomWords) => {
    randomWords.sort(() => 0.5 - Math.random());
    const array = new Array(10).fill("").map(() => {
      const randomWord = Math.floor(Math.random() * randomWords.length);
      return randomWords[randomWord];
    });
    return array;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.target.value === "submit") {
      if (inputWord === correctWord) {
        setIsCorrect(true);
      }
      console.log(correctWord);
    }
  };

  const handlePrevButton = () => {
    WordDataRapidAPI(
      randomWordsArray[0][Math.max(0, questionNumber - 1)],
      setDefinition,
      setCorrectWord,
      setSimilarWords
    );
    setIsCorrect(false);
    setQuestionNumber(Math.max(0, questionNumber - 1));
  };

  const handleNextButton = () => {
    WordDataRapidAPI(
      randomWordsArray[0][
        Math.min(questionNumber + 1, randomWordsArray[0].length - 1)
      ],
      setDefinition,
      setCorrectWord,
      setSimilarWords
    );
    setIsCorrect(false);

    setQuestionNumber(Math.min(questionNumber + 1, randomWordsArray[0].length));
  };

  return (
    <div className="bg-gray-300 flex justify-center items-center h-screen w-screen">
      <div>
        {isCorrect && (
          <div className="text-2xl text-white text-center p-1 bg-green-600 rounded-3xl animate-bounce">
            Correct
          </div>
        )}
        <h1 className="font-bold text-center p-10 font-sans text-5xl">
          Question {questionNumber + 1}
        </h1>
        <div className=" bg-white p-10 rounded-2xl h-64 content-between grid grid-cols-1 gap-4">
          <div className="bg-gray-200 break-words w-96 rounded-lg p-3 h-32">
            {definition ? definition : <LoadSpinning />}
          </div>
          <div className="flex">
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="word"
              onChange={(e) => setInputWord(e.target.value)}
              onKeyDown={handleKeyDown}
              required
            />
            <button
              className="bg-teal-400 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded h-10"
              onClick={handleKeyDown}
              value="submit"
            >
              submit
            </button>
            <HintModal correctWord={correctWord} similarWords={similarWords} />
          </div>
        </div>
        <div className="h-5"></div>
        <div className="flex justify-around	items-center">
          <button
            className="text-4xl h-16 w-16 text-center p-1 bg-green-600 rounded-full hover:scale-110 text-white flex justify-center items-center"
            onClick={handlePrevButton}
          >
            <AiOutlineArrowLeft />
          </button>
          <button
            className="text-4xl h-16 w-16 text-center p-1 bg-green-600 rounded-full hover:scale-110 text-white flex justify-center	items-center "
            onClick={handleNextButton}
          >
            {<AiOutlineArrowRight />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
