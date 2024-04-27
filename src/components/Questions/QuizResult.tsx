import { useLocation, useNavigate } from "react-router-dom";
import { question } from "./QuestionsSource";
import { Button, ListGroup, Stack } from 'react-bootstrap';
import './Question.css';

enum QuestionState {
  Correct,
  Wrong,
  Unanswered
}

type statefulQuestion = {
  question: question;
  state: QuestionState;
}

function QuizResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const questions: question[] = location.state.questionData;
  const sQuestions: statefulQuestion[] = questions.map(question => {
    const state = question.userAnswer === -1 
                  ? QuestionState.Unanswered 
                  : question.userAnswer === question.correct 
                  ? QuestionState.Correct 
                  : QuestionState.Wrong;
    return { question, state };
  });

  
  const totalCorrect = sQuestions.filter(q => q.state == QuestionState.Correct).length;
  const totalUnanswered = sQuestions.filter(q => q.state === QuestionState.Unanswered).length;
  const totalWrong = sQuestions.length - totalCorrect - totalUnanswered;

  const renderClassStyle = (state: QuestionState) => {
    switch (state) {
      case QuestionState.Correct:
        return "score_correct";
      case QuestionState.Wrong:
        return "score_wrong";
      case QuestionState.Unanswered:
        return "score_unanswered";
    }
  }

  const renderDisplayStyle = (state: QuestionState, question: question) => {
    const genBody = (question : question) => {
      switch (state) {
        case QuestionState.Correct:
        case QuestionState.Unanswered:
            return (
                <p>Correct Answer: {question.options[question.correct]}</p>
            );
          
        default:
            return (
              <>
                <p>Your Answer: {question.options[question.userAnswer || 0]}</p>
                <p>Correct Answer: {question.options[question.correct]}</p>
              </>
            );
        }
    }

    return (
      <>
      <h5 dangerouslySetInnerHTML={{ __html: question.title}}/>
      {genBody(question)}
      </>
    );
    
  }

  return (
    <div className="main-content">
      <div className="container-fluid d-flex flex-column align-items-center">

      <h1 className="text-white mt-5 text-center">Quiz Results</h1>

      <div className="d-flex justify-content-evenly flex-wrap p-4 gap-5">
        <div className="score_index score_correct">
          <h1>{totalCorrect}</h1>
          <p>Correct</p>
        </div>

        <div className="score_index score_wrong">
          <h1>{totalWrong}</h1>
          <p>Wrong</p>
        </div>

        <div className="score_index score_uns">
          <h1>{totalUnanswered}</h1>
          <p>Unanswered</p>
        </div>
      </div>

      <ListGroup className="col-md-10 mx-auto gap-2">
        {sQuestions.map(({question, state}, index) => (
            <ListGroup.Item
              key={index}
              className= { renderClassStyle(state) + " answer_card"}
              >
              {renderDisplayStyle(state, question)}
            </ListGroup.Item>
          ))}
      </ListGroup>

      <Stack className="mx-auto d-flex flex-row gap-5 p-5">

        <Button className="p-4 text-white"
                style={{
                  backgroundColor: "#FF9A30",
                  fontWeight: "bold"
                }} 
                onClick={() => navigate("/categories")}
        >
          Play Again
        </Button>

        <Button className="p-4 text-white"
                style={{
                  backgroundColor: "#FF9A30",
                  fontWeight: "bold"
                }} 
                onClick={() => navigate("/")}
        >
          Back to Lobby
        </Button>

      </Stack>

      </div>
    </div>
  ) as JSX.Element;
}


export default QuizResult;