import { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
import { CategoryType, QuestionType, UserType } from '../types';
import { getMyQuestions } from '../lib/apiWrapper';
import QuizCard from '../components/QuizCard';

type MyQuizProps = {
    isLoggedIn: boolean,
    currentUser: Partial<UserType>,
    flashMessage: (newMessage:string, newCategory:CategoryType) => void
}

export default function MyQuiz({ isLoggedIn, currentUser, flashMessage }: MyQuizProps) {

    const [questions, setQuestions] = useState<QuestionType[]>([])


    useEffect(() => {
        console.log('Hello World')
        const token = localStorage.getItem('token');
        async function fetchData() {
            const response = await getMyQuestions(token!);
            if (response.data) {
                let questions = response.data['questions'];
                setQuestions(questions)
            }
        }

        fetchData();
    }, [])

    return (
        <>
            {questions.map((q) => (<QuizCard key={q.id} question={q} currentUser={currentUser} />))}
        </>
    )
}
