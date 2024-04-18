// import { useState } from 'react';
import { QuestionType } from '../types';
import Card from 'react-bootstrap/Card';

type QuizCardProps = {
    question: QuestionType
}

export default function QuizCard({ question }: QuizCardProps) {

    console.log(question);

    // const [showForm, setShowForm] = useState(false);

    return (
        <Card className='my-3' bg='primary' text='light'>
            <Card.Header>{ question.created_on } by { question.author }</Card.Header>
            <Card.Body>
                <Card.Title>{ question.question }</Card.Title>
                {/* <Card.Subtitle>{ post.author.username }</Card.Subtitle>
                <Card.Text>{ post.body }</Card.Text> */}
            </Card.Body>
        </Card>
    )
}
