import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import AlertMessage from './components/AlertMessage';
import Navigation from "./components/Navigation";
import Container from "react-bootstrap/Container";
import Quiz from "./views/Quiz";
import SignUp from "./views/SignUp";
import { CategoryType, UserType } from './types';
import LogIn from './views/LogIn';
import Profile from './views/Profile';
import MyQuiz from './views/MyQuestions';
import EditQuestion from './views/EditQuestion';

export default function App() {
    const [message, setMessage] = useState<string | undefined>(undefined);
    const [category, setCategory] = useState<CategoryType|undefined>(undefined)

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('token') ? true : false)
    const [loggedInUser, setLoggedInUser] = useState<Partial<UserType>>({
        email: '',
        first_name: '',
        last_name: '',
        token: '',
        user_id: NaN
    })

    const flashMessage = (newMessage:string|undefined, newCategory:CategoryType|undefined) => {
        setMessage(newMessage);
        setCategory(newCategory);
        // setTimeout(() => {
        //     if (newMessage && newCategory){
        //         flashMessage(undefined, undefined)
        //     }
        // }, 10000)
    }

    useEffect(() => {
        async function getLoggedInUser(){
            if (isLoggedIn){
                setLoggedInUser({
                    email: localStorage.getItem('email')!,
                    first_name: localStorage.getItem('first_name')!,
                    last_name: localStorage.getItem('last_name')!,
                    token: localStorage.getItem('token')!,
                    user_id: parseInt(localStorage.getItem('user_id')!)
                })  
            }
        }
        getLoggedInUser();
    }, [isLoggedIn])

    const logUserIn = () => {
        setIsLoggedIn(true)
    }


    const logUserOut = () => {
        setIsLoggedIn(false)
        localStorage.clear();
            // localStorage.remove('token');
            // localStorage.remove('email');
            // localStorage.remove('first_name');
            // localStorage.remove('last_name');
            // localStorage.remove('user_id');
        flashMessage('You have been logged out', 'dark');
        setLoggedInUser({
            admin: null,
            created_on: "",
            email: "",
            first_name: "",
            last_name: "",
            token: "",
            modified_on: "",
            user_id: NaN,
        }) 
    }




    return (
        <>
            <Navigation isLoggedIn={isLoggedIn} logUserOut={logUserOut}/>
            {message && <AlertMessage message={message} category={category} flashMessage={flashMessage} />}

            <Container>
                <Routes>
                    <Route path="/" element={<Quiz isLoggedIn={isLoggedIn} currentUser={loggedInUser} flashMessage={flashMessage} />} />
                    <Route path="/signup" element={<SignUp  flashMessage={flashMessage} />} />
                    <Route path="/login" element={<LogIn flashMessage={flashMessage} logUserIn={logUserIn}/>} />
                    <Route path="/profile" element={<Profile logUserOut={logUserOut} flashMessage={flashMessage} />} />
                    <Route path="/myquiz" element={<MyQuiz isLoggedIn={isLoggedIn} currentUser={loggedInUser} flashMessage={flashMessage} />} />
                    <Route path="/editquestion/:questionId" element={<EditQuestion currentUser={loggedInUser} flashMessage={flashMessage} />} />
                </Routes>
            </Container>
        </>
    );
}

