import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { CategoryType, QuestionFormDataType } from '../types';
import { createQuestion } from '../lib/apiWrapper';

type QuestionFormProps = {
    flashMessage: (newMessage:string, newCategory:CategoryType) => void
    
}

export default function QuestionForm({ flashMessage }: QuestionFormProps) {
    const [newQuestion, setNewQuestion] = useState<QuestionFormDataType>({question: '', answer: ''});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.name, event.target.value);
        setNewQuestion({...newQuestion, [event.target.name]:event.target.value })
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        createQuestion(newQuestion, localStorage.getItem('token')!);
        flashMessage('Question Created', 'success');
    }

    return (
        <Card className='my-3'>
            <Card.Body>
                <h3 className="text-center">Create New Question</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>Post Title</Form.Label>
                    <Form.Control name='question' placeholder='Enter New Quiz Question' value={newQuestion.question} onChange={handleInputChange} />
                    <Form.Label>Post Body</Form.Label>
                    <Form.Control as='textarea' name='answer' placeholder='Enter Question Answer' value={newQuestion.answer} onChange={handleInputChange} />
                    <Button className='mt-3 w-100' variant='success' type='submit'>Create Question</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}