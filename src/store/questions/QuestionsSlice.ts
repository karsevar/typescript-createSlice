import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import {fetchQuizQuestions} from '../../API';
import {QuestionState, Difficulty} from './QuestionsTypes';

export interface QuestionsReducerState {
    questions: QuestionState[],
    loading: boolean
}

const initialState: QuestionsReducerState = {
    questions: [],
    loading: false
}

export const getQuestionsAsync = createAsyncThunk(
    'questions/fetchQuizQuestions',
    async ({amount, difficulty}: {amount: number, difficulty: Difficulty}) => {
        const response = await fetchQuizQuestions(amount, difficulty)
        return response
    }
);

export const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getQuestionsAsync.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getQuestionsAsync.fulfilled, (state, action) => {
                console.log('from action reducer slice', action.payload)
                console.log('state in slice', state)
                state.questions = action.payload
                state.loading = false
            })
    }
})

export const selectQuestions = (state: RootState) => state.questionsState


export default questionsSlice.reducer;