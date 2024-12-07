import React, { useState } from 'react';

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

  const [currentIndex, setCurrentIndex] = useState(0); // Current question index
  const [selectedAnswer, setSelectedAnswer] = useState(""); // User's selected answer
  const [score, setScore] = useState(0); // User's score
  const [answered, setAnswered] = useState(false); // Whether the question is answered

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
    setAnswered(false);
    setSelectedAnswer("");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length); // Loop back to the first question if all questions are answered
  };

  const { question, options, correctAnswer } = questions[currentIndex];

  return (
    <div className="App bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Quiz App</h1>

        {/* Question */}
        <div className="text-xl text-center mb-6">{question}</div>

        {/* Options */}
        <div className="flex flex-col items-center space-y-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
            >
              {option}
            </button>
          ))}
        </div>

        {/* Result Section */}
        {answered && (
          <div className="mt-6 text-center">
            <h2 className="text-lg">
              {selectedAnswer === correctAnswer ? "Correct!" : "Incorrect!"}
            </h2>
            <p className="mt-2">
              Your score: {score} {selectedAnswer === correctAnswer ? "(Correct)" : "(Incorrect)"}
            </p>
            <button
              onClick={nextQuestion}
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
