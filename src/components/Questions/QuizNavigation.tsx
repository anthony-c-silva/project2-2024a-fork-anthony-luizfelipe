import { useState } from "react";
import Question from "./Question";
import { question } from "./QuestionsSource";
import { Nav, Button, Stack } from "react-bootstrap";

import "./Question.css";

interface Props {
  questions: question[];
  onSubmit: (answers: number[]) => void;
}

function QuizzNavigation({ questions, onSubmit }: Props) {

  const leng = questions.length;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswer] = useState(new Array(leng).fill(-1));

  const handleAnswerChange = (index: number, value: number) => {
    let a = userAnswers.slice();
    a[index] = value;
    setUserAnswer(a);
  };

  const handleNextQuestion = () => {
    if (currentQuestion === leng - 1) return;
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion === 0) return;
    setCurrentQuestion(currentQuestion - 1);
  };

  const isLastQuestion = currentQuestion === leng - 1;
  const isFirstQuestion = currentQuestion === 0;

  return (
    <div className="main-content">
      <ul>
        {questions.map((question: question, index: number) => (
          <li
            key={index}
            style={{
              display: currentQuestion === index ? "block" : "none",
            }}
          >
            <Question
              title={question.title}
              options={question.options}
              onSetOption={(op: number) => handleAnswerChange(index, op)}
            />
          </li>
        ))}
      </ul>

      <Nav className="align-items-center row d-flex flex-wrap justify-content-around m-3 gap-3">
        <Button
          onClick={handlePreviousQuestion}
          disabled={isFirstQuestion}
          className="col-5 col-sm-2 p-4 question_button"
        >
          Previous
        </Button>
        <Button
          onClick={
            isLastQuestion ? () => onSubmit(userAnswers) : handleNextQuestion
          }
          className="col-5 col-sm-2 p-4 question_button"
        >
          {isLastQuestion ? "Submit" : "Next"}
        </Button>
        <Stack
          direction="horizontal"
          gap={3}
          className="col-sm order-sm-2 justify-content-center flex-wrap p-3"
        >
          {questions.map((_: question, index: number) => (
            <Button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={
                "question_button" +
                (index === currentQuestion ? " question_active" : "") +
                (userAnswers[index] !== -1 ? " question_answered" : " question_unanswered")
              }
            >
              {index + 1}
            </Button>
          ))}
        </Stack>
      </Nav>
    </div>
  ) as JSX.Element;
}

export default QuizzNavigation;
