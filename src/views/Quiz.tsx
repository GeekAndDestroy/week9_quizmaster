import { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
import { QuestionType } from '../types';
import { getAllQuestions } from '../lib/apiWrapper';
import QuizCard from '../components/QuizCard';

type QuizProps = {}

export default function Quiz({ }: QuizProps) {

    const [questions, setQuestions] = useState<QuestionType[]>([])

    useEffect(() => {
        console.log('Hello World')
        async function fetchData() {
            const response = await getAllQuestions();
            if (response.data) {
                let questions = response.data['questions'];
                setQuestions(questions)
            }
        }

        fetchData();
    }, [])

    return (
        <>
            {questions?.map((q) => (<QuizCard key={q.id} question={q} />))}
        </>
    )
}
