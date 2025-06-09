import React, {useState} from 'react';
import Results from "./results";

function Quiz() {
    const questionBank = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "London", "Paris", "Rome"],
            answer: "Paris",
        },
        {
            question: "Which language is used for web apps?",
            options: ["PHP", "Python", "Javascript", "All"],
            answer: "All",
        },
        {
            question: "What does JSX stand for?",
            options: ["JavaScript XML", "Java Syntx Extension", "Just a Simple Example", "None of the above"],
            answer: "JavaScript XML",
        },
    ];

    const initialAnswers = [null, null, null];

    const [userAnswers, setUserAnswers] = useState(initialAnswers);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [isQuizFinished, setIsQuizFinished] = useState(false)

    const selectedAnswer = userAnswers[currentQuestion];
    
    function handleSelectOption(option) {
        console.log("Selected option:", option); // Logs the selected option to the console

        const newUserAnswers = [...userAnswers];
        newUserAnswers[currentQuestion] = option;

        setUserAnswers(newUserAnswers);

    // Send to Django backend
    fetch('http://localhost:8000/api/log-answer/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          question: questionBank[currentQuestion].question,
          selected: option
      })
  })
  .then(res => res.json())
  .then(data => console.log("Response from backend:", data))
  .catch(err => console.error("Failed to send to Django:", err));
    }

    function goToNext() {
      if (currentQuestion === questionBank.length -1){
          setIsQuizFinished(true);
      } else{
     setCurrentQuestion(currentQuestion + 1);
      }
    }

    function goToPrev() {
        if (currentQuestion > 0) {
           setCurrentQuestion(currentQuestion - 1);
        }
    }

    if (isQuizFinished) {
       return <Results/>
    }

    return (
      <div> 
        <h2> Question {currentQuestion + 1}</h2>
        <p className="question"> {questionBank[currentQuestion].question} </p>

        {questionBank[currentQuestion].options.map((option) => (
            <button 
              className={"option" + (selectedAnswer === option ? " selected" : "")} 
              onClick={() => handleSelectOption(option)}> {option} </button>
        ))}

        {/* <p> Option Selected: {optionSelected} </p> */}

        {/* <button className="option">Berlin</button>
        <button className="option">Paris</button> */}
        <div className="nav-buttons">
          <button onClick={goToPrev} disabled={currentQuestion === 0}> Previous</button>
          <button onClick={goToNext} disabled={!selectedAnswer}> 
            {currentQuestion === questionBank.length -1 ? "Finish Quiz" : "Next"}
          </button>
        </div>
      </div>
    ); 
}

export default Quiz;