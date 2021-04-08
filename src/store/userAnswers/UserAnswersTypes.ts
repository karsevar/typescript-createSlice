export type AnswerObject = {
    question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

export interface UserAnswersState {
    TOTAL_QUESTIONS: 10,
    userAnswers: AnswerObject[],
    gameOver: boolean,
    score: number,
    questionIndex: number
}



