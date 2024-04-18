import { useState } from 'react';
import { QuestionType } from '../types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


type QuizCardProps = {
    question: QuestionType
}

export default function QuizCard({ question }: QuizCardProps) {

    console.log(question);

    const [showAnswer, setShowAnswer] = useState(false); 

    const handleClick = () => {
        setShowAnswer(!showAnswer);
  };

    return (
        <Card className='my-3' bg='primary' text='light'>
            <Card.Header>{ question.created_on } by { question.author }</Card.Header>
            <Card.Body>
                <Card.Title>{ question.question }</Card.Title>
                <Button variant={showAnswer ? "warning" : "success"} className='my-3' onClick={handleClick}>{showAnswer ? "Hide Answer" : "See Answer"}</Button>
                {showAnswer ? (
                    <Card.Subtitle>{ question.answer }</Card.Subtitle>
                ) : (
                    <></>
                )
            }


                
            </Card.Body>
        </Card>
    )
}
