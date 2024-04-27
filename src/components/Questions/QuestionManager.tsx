import { question } from "./QuestionsSource";
import { useLocation, useNavigate } from "react-router-dom";
import QuizNavigation from "./QuizNavigation";

import "./Question.css";

function QuestionManager() {
  const location = useLocation();

  const questionData : question[] = location.state.questions;
  const navigate = useNavigate();

  const handleSubmit = (userAnswers: number[]) => {
    questionData.forEach((q, index) => {
      questionData[index].userAnswer = userAnswers[index];
    });

    const storedPoints = parseInt(localStorage.getItem('points') || '0');
    const totalCorrect = questionData.filter(q => q.userAnswer === q.correct).length;

    if (!storedPoints)
      localStorage.setItem('points', totalCorrect.toString());
    else
      localStorage.setItem('points', (totalCorrect + storedPoints).toString());

    navigate('/result', { state: { questionData } });
  };

  return (
    <div className="main-content">
      <QuizNavigation questions={questionData} onSubmit={handleSubmit} />
    </div>
  ) as JSX.Element;
}

export default QuestionManager;