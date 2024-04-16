import React from "react";
import "./home.scss";
import asEconomicsQuestionsP2 from "../../data/asEconomicsQuestionsP2.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

const Home = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [subject, setSubject] = useState("");
  const [examBoard, setExamBoard] = useState("");
  const [questionsValue, setQuestionsValue] = useState(20);

  const maxValue = asEconomicsQuestionsP2.length;

  const questions = [
    {
      question: "What subject would you like to study?",
      options: ["Economics"],
    },
    {
      question: "Choose your exam board:",
      options: ["AQA"],
    },
    {
      question: "How many exam questions would you like to answer?",
    },
  ];

  const handleOptionClick = (option) => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex === 0) {
        setSubject(option);
      } else {
        setExamBoard(option);
      }
      return prevIndex + 1;
    });
  };

  const handleSubmit = () => {
    navigate("/quiz");
  };

  return (
    <div className="home">
      <div className="header">
        <h1>Exam Question Generator</h1>
        <div className="creditsWrapper">
          <p>by Joseph Meadowcroft</p>
          <a href="https://github.com/josephmeadowcroft" target="_blank">
            <img src="src/assets/github.png" alt="github" />
          </a>
        </div>
      </div>
      <div className="quizSelectionForm">
        {currentQuestionIndex < 2 && (
          <motion.div
            className="question"
            initial={{ opacity: 0, x: -100 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 1,
              },
            }}
          >
            <h2>{questions[currentQuestionIndex].question}</h2>
            <div className="optionBtns">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <motion.button
                  key={index}
                  className="optionBtn"
                  onClick={() => handleOptionClick(option)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  value={option}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
        {currentQuestionIndex < questions.length &&
          currentQuestionIndex >= 2 && (
            <motion.div
              className="question"
              initial={{ opacity: 0, x: -100 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 1,
                },
              }}
            >
              <h2>{questions[currentQuestionIndex].question}</h2>
              <div className="questionInputs">
                <h3>{questionsValue}</h3>
                <Slider
                  aria-label="slider-ex-1"
                  defaultValue={20}
                  className="slider"
                  min={1}
                  max={maxValue}
                  onChange={(val) => setQuestionsValue(val)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <motion.button
                  className="startBtn"
                  onClick={() => handleSubmit()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Start
                </motion.button>
              </div>
            </motion.div>
          )}
      </div>
    </div>
  );
};

export default Home;
