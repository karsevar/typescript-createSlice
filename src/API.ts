import {shuffleArray} from './utils';
import {Difficulty, Question} from './store/questions/QuestionsTypes';


export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty ) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => {
        return {
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }
    })
}