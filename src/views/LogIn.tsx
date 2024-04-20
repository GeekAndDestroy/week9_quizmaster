import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { CategoryType, LogInFormDataType } from '../types';
import { useNavigate } from "react-router-dom";
import { login } from '../lib/apiWrapper';


type LogInProps = {
    flashMessage: (newMessage:string|undefined, newCategory:CategoryType|undefined) => void
    logUserIn: () => void;
}

export default function LogIn({ flashMessage, logUserIn}: LogInProps) {
    const navigate = useNavigate();

    const [userFormData, setUserFormData] = useState<LogInFormDataType>(
        {
            email: '',
            password: ''
        }
    )

    const [seePassword, setSeePassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(userFormData);
        let response = await login(userFormData.email!, userFormData.password!);
        if (response.error){
            console.log(response.error);
            flashMessage(response.error, 'danger');
        } else {
            let newUser = response.data!;
            localStorage.setItem('token', newUser.token);
            localStorage.setItem('email', newUser.email);
            localStorage.setItem('first_name', newUser.first_name);
            localStorage.setItem('last_name', newUser.last_name);
            localStorage.setItem('user_id', newUser.user_id.toString());
            logUserIn();
            flashMessage(`Welcome back ${newUser.first_name} ${newUser.last_name}`, 'success')
            navigate('/')
        }
    }

    return (
        <>
            <h1 className="text-center">Log In Here</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>

                        <Form.Label htmlFor='email'>Email</Form.Label>
                        <Form.Control id='email' name='email' type='email' placeholder='Enter Email' value={userFormData.email} onChange={handleInputChange}/>

                        <Form.Label htmlFor='password'>Password</Form.Label>
                        <InputGroup>
                            <Form.Control id='password' name='password' type={seePassword ? 'text' : 'password'} placeholder='Enter Password' value={userFormData.password} onChange={handleInputChange}/>
                            <InputGroup.Text onClick={() => setSeePassword(!seePassword)}><i className={seePassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></InputGroup.Text>
                        </InputGroup>


                        <Button type='submit' variant='outline-primary' className='w-100 mt-3' >Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}