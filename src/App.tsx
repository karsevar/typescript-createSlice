import React from 'react';
import QuestionCard from './components/QuestionCard';

import {useAppSelector, useAppDispatch} from './store/app/hooks';
import {
  getQuestionsAsync,
  selectQuestions,
} from './store/questions/QuestionsSlice';
import {
  resetGame,
  checkAnswer,
  nextQuestion,
  selectUserInfo
} from './store/userAnswers/UserAnswersSlice';
// types
import {Difficulty, QuestionState} from './store/questions/QuestionsTypes';
import {UserAnswersState} from './store/userAnswers/UserAnswersTypes';

// styles
import {GlobalStyle, Wrapper} from './App.styles';


const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {questions, loading}: {questions: QuestionState[], loading: boolean} = useAppSelector(selectQuestions);
  const {userAnswers, gameOver, score, questionIndex, TOTAL_QUESTIONS}: UserAnswersState = useAppSelector(selectUserInfo)

  const startTrivia = async () => {
    dispatch(resetGame())

    dispatch(getQuestionsAsync(
      {amount: TOTAL_QUESTIONS, difficulty: Difficulty.EASY}
    ));
  }

  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>React Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className='start' onClick={startTrivia}>
        Start
      </button> )
        : null
      }
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading ? <p>Loading Questions...</p> : null}
      {!loading && !gameOver && questions.length > 0 && (
          <QuestionCard
            questionNr={questionIndex + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[questionIndex].question}
            answers={questions[questionIndex].answers}
            userAnswer={userAnswers ? userAnswers[questionIndex] : undefined}
            callback={e => dispatch(checkAnswer({e, question: questions[questionIndex]}))}
        />
      )}
      {!gameOver && !loading && userAnswers.length === questionIndex + 1 && questionIndex !== TOTAL_QUESTIONS - 1 ? (
        <button className='next' onClick={() => dispatch(nextQuestion())}>
        Next Question
      </button>
      ) : null
      }
    </Wrapper>
    </>
  )
}

export default App;
