import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import { UserAnswersState} from './UserAnswersTypes';
import {QuestionState} from '../questions/QuestionsTypes';

const initialState: UserAnswersState = {
    TOTAL_QUESTIONS: 10,
    userAnswers: [],
    gameOver: true,
    score: 0,
    questionIndex: 0
}

export const userAnswersSlice = createSlice({
    name: 'userAnswers',
    initialState,
    reducers: {
        resetGame: (state) => {
            state.userAnswers = []
            state.gameOver = false
            state.score = 0
            state.questionIndex = 0
        },
        checkAnswer: (state, action: PayloadAction<{e: React.MouseEvent<HTMLButtonElement>, question: QuestionState}>) => {
            if (!state.gameOver) {
                const {e, question} = action.payload;
                const answer = e.currentTarget.value;
                const correct = question.correct_answer === answer;

                if (correct) {
                    state.score += 1
                }

                const answerObject = {
                    question: question.question,
                    answer,
                    correct,
                    correctAnswer: question.correct_answer,
                }

                state.userAnswers = [
                    ...state.userAnswers,
                    answerObject
                ]
            }
        },

        nextQuestion: (state) => {
            const nextQuestion = state.questionIndex + 1;

            if (nextQuestion === state.TOTAL_QUESTIONS) {
                state.gameOver = true
            } else {
                state.questionIndex += 1
            }
        }
    }
})

export const {resetGame, checkAnswer, nextQuestion} = userAnswersSlice.actions;

export const selectUserInfo = (state: RootState) => state.userState

export default userAnswersSlice.reducer;