export type question = {
  title: string;
  options: string[];
  correct: number;
  userAnswer?: number;
}

async function fetchQuestionsData(category : any, difficulty : string) {
    try {
      const url = `https://opentdb.com/api.php?amount=10&
      ${category == 0 ? "" : `category=${category}`}&difficulty=${difficulty}&type=multiple`;
      console.log(url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
  }
}


function processQuestionsData(data: any) : question[] {
  let questions = data.results;

  if (!questions) {
    return [];
  }

  let processedQuestions : [question] = new Array(questions.length) as [question];

  for (let i = 0; i < questions.length; i++) {
    
    questions[i].options = questions[i].incorrect_answers;
    questions[i].correct = Math.floor(Math.random() * 4);
    questions[i].options.splice(questions[i].correct, 0, questions[i].correct_answer);
    
    processedQuestions[i] = {
      title:   questions[i].question,
      options: questions[i].options,
      correct: questions[i].correct
    };
  }

  return processedQuestions;
}
  
export async function getQuestionsData(category :any, difficulty: string) {
    const rawData = await fetchQuestionsData(category, difficulty);
    const processedData = processQuestionsData(rawData);
    return processedData;
}
