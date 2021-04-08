import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import questionsReducer from '../questions/QuestionsSlice';
import quizInfoReducer from '../userAnswers/UserAnswersSlice'

export const store = configureStore({
    reducer: {
        questionsState: questionsReducer,
        userState: quizInfoReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;