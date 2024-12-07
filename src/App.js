import React, { useState, useEffect } from 'react';

function App() {
  // Array of quiz questions and answers
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      question: "What is the largest planet in our Solar System?",
      options: ["Earth", "Jupiter", "Mars", "Saturn"],
      correctAnswer: "Jupiter"
    },
    {
      question: "Which ocean is the largest?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      correctAnswer: "Pacific"
    }
  ];

  // State variables
  const [currentIndex, setCurrentIndex] = useState(0); // Current question index
  const [selectedAnswer, setSelectedAnswer] = useState(""); // User's selected answer
  const [score, setScore] = useState(0); // User's score
  const [answered, setAnswered] = useState(false); // Whether the question is answered
  const [isQuizFinished, setIsQuizFinished] = useState(false); // To track when the quiz is finished
  const [timer, setTimer] = useState(10); // Timer for each question

  // Shuffle function for options
  const shuffleOptions = (options) => {
    const shuffled = [...options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Timer effect
  useEffect(() => {
    if (timer === 0 && !answered) {
      nextQuestion(); // Move to the next question when the timer reaches 0
    } else {
      const interval = setInterval(() => {
        if (timer > 0) setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, answered]);

  // Handle answer selection
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setAnswered(true);
    if (answer === questions[currentIndex].correctAnswer) {
      setScore(score + 1); // Increase score if the answer is correct
    }
  };

  // Move to the next question
  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to the next question
    } else {
      setIsQuizFinished(true); // End quiz if no more questions
    }
    setAnswered(false);
    setSelectedAnswer("");
    setTimer(10); // Reset timer for the next question
  };

  // Get current question data
  const { question, options, correctAnswer } = questions[currentIndex];
  const shuffledOptions = shuffleOptions(options);

  return (
    <div className="App bg-gray-100 min-h-screen flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Quiz App</h1>

        {/* Display Timer */}
        <div className="text-center text-xl font-semibold text-gray-700 mb-4">
          Time Remaining: {timer} seconds
        </div>

        {/* Display Question */}
        <div className="text-xl text-center mb-6 font-medium text-gray-800">{question}</div>

        {/* Options */}
        <div className="flex flex-col items-center space-y-4">
          {shuffledOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 ${
                selectedAnswer === option ? "bg-blue-700" : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Answer Feedback */}
        {answered && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold text-gray-700">
              {selectedAnswer === correctAnswer ? "Correct!" : "Incorrect!"}
            </h2>
            <p className="mt-2 text-gray-600">
              Your score: {score}{" "}
              {selectedAnswer === correctAnswer ? "(Correct)" : "(Incorrect)"}
            </p>
            <button
              onClick={nextQuestion}
              className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
            </button>
          </div>
        )}

        {/* Final Score */}
        {isQuizFinished && (
          <div className="mt-6 text-center">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">Quiz Finished!</h2>
            <p className="text-xl text-gray-600 mb-4">
              Your final score is: <span className="font-bold text-blue-600">{score}</span>
            </p>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setScore(0);
                setIsQuizFinished(false);
              }}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Restart Quiz
            </button>
          </div>
        )}

        {/* Quit Button */}
        {!isQuizFinished && (
          <button
            onClick={() => {
              setIsQuizFinished(true);
              alert("You quit the quiz. Your final score: " + score);
            }}
            className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Quit Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
