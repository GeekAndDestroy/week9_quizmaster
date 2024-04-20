import { useState } from 'react';
import { Link } from 'react-router-dom';
import { QuestionType, UserType } from '../types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


type QuizCardProps = {
    question: QuestionType,
    currentUser?: Partial<UserType>
}

export default function QuizCard({ question, currentUser }: QuizCardProps) {

    console.log(question);

    const [showAnswer, setShowAnswer] = useState(false); 

    const handleClick = () => {
        setShowAnswer(!showAnswer);
  };

  const author = `${currentUser?.first_name} ${currentUser?.last_name}_0${currentUser?.user_id}`;

    return (
        <Card className='my-3' bg='primary' text='light'>
            <Card.Header>{ question.created_on } by { question.author }</Card.Header>
            <Card.Body>
                <Card.Title>{ question.question }</Card.Title>
                <Button variant={showAnswer ? "warning" : "success"} className='my-3' onClick={handleClick}>{showAnswer ? "Hide Answer" : "See Answer"}</Button>
                {author == question.author && (
                    <Link to={`/editquestion/${question.id}`}><Button variant="warning">Edit Question</Button></Link>
                )}
                {showAnswer ? (
                    <Card.Footer>{ question.answer }</Card.Footer>
                ) : (
                    <></>
                )
            } 
            </Card.Body>
        </Card>
    )
}
