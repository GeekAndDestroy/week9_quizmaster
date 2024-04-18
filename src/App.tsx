// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Container from 'react-bootstrap/Container';
import Quiz from './views/Quiz';
import SignUp from './views/SignUp';



export default function App(){

  return (
    <>
        <Navigation />
        <Container>
            <Routes>
                <Route path='/' element={<Quiz /> } />
                <Route path='/signup' element={<SignUp /> } />
            </Routes>
        </Container>
    </>
)
}
