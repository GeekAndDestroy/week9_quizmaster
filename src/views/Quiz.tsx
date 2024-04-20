import { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
import { CategoryType, QuestionType, UserType } from '../types';
import { getAllQuestions } from '../lib/apiWrapper';
import QuizCard from '../components/QuizCard';
import { Button, Col } from 'react-bootstrap';
import QuestionForm from '../components/QuestionForm';

type QuizProps = {
    isLoggedIn: boolean,
    currentUser: Partial<UserType>,
    flashMessage: (newMessage:string, newCategory:CategoryType) => void
}

export default function Quiz({ isLoggedIn, flashMessage }: QuizProps) {

    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [showForm, setShowForm] = useState(false);

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
            {isLoggedIn && (
                    <Col>
                        <Button className='w-100' variant='success' onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide Form' : 'Add Question'}</Button>
                    </Col>
                )}
                { showForm && <QuestionForm flashMessage={flashMessage} /> }
            {questions?.map((q) => (<QuizCard key={q.id} question={q} />))}
        </>
    )
}
