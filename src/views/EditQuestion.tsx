import { useEffect, useState } from 'react';
import { useNavigate,  useParams } from 'react-router-dom';
import { getQuestionById, editQuestionById, deleteQuestionById } from '../lib/apiWrapper';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap//Modal';
import { CategoryType, QuestionFormDataType, UserType } from '../types';

type EditQuestionProps = {
    flashMessage: (newMessage: string, category:CategoryType) => void
    currentUser: Partial<UserType>,
}

export default function EditQuestion({ flashMessage, currentUser }: EditQuestionProps) {
    const { questionId } = useParams();
    const navigate = useNavigate();

    const [questionToEdit, setQuestionToEdit] = useState<QuestionFormDataType>( { question: '', answer: '' } );

    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    let author = `${currentUser.first_name} ${currentUser.last_name}_0${currentUser.user_id}`

    // useEffect( () => {
    //     async function getQuestion() {
    //         let response = await getQuestionById(Number(questionId!));
    //         if (response.data) {
    //             const question = response.data;
                

    //             console.log(currentUser.user_id)
    //             if (!currentUser) {
    //                 console.log('No user logged in')
    //             } else if (question.author !== author) {
    //                 flashMessage('You are not the author of this question', 'danger')
    //                 navigate('/')
    //             } else {
    //                 setQuestionToEdit(question)
    //             }
    //         } else if (response.error) {
    //             flashMessage(response.error, 'danger');
    //             navigate('/')
    //         } else {
    //             flashMessage('An error occurred', 'danger');
    //             navigate('/')
    //         }
    //     }

    //     getQuestion();
    // }, [questionId])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionToEdit({ ...questionToEdit, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('token') || '';
        const response = await editQuestionById(Number(questionId!), questionToEdit, token);
        if (response.error) {
            flashMessage(response.error, 'danger');
        } else {
            flashMessage('Question Updated', 'success');
            navigate('/')
        }
    }

    const handleDeleteQuestion = async () => {
        const token = localStorage.getItem('token') || '';
        const response = await deleteQuestionById(Number(questionId!), token);
        if (response.error) {
            flashMessage(response.error, 'danger');
        } else {
            flashMessage('Question Deleted', 'success');
            navigate('/')
        }
    }

  return (
        <>
            <Card>
                <Card.Body>
                    <h3 className='text-center'>Edit Question</h3>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>Question</Form.Label>
                        <Form.Control name='question' placeholder='Enter New Quiz Question' value={questionToEdit.question} onChange={handleInputChange} />
                        <Form.Label>Answer</Form.Label>
                        <Form.Control name='answer' placeholder='Enter Question Answer' value={questionToEdit.answer} onChange={handleInputChange} />
                        <Button className='mt-3 w-50' variant='success' type='submit'>Update Question</Button>
                    </Form>
                    <Button className='mt-3 w-50' variant='danger' onClick={openModal}>Delete Question</Button>
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete this question?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This action cannot be undone</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Cancel</Button>
                    <Button variant='danger' onClick={handleDeleteQuestion}>Delete Question</Button>
                </Modal.Footer>
            </Modal>
        </>
  )
}