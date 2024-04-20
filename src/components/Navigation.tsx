// import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import Button from 'react-bootstrap/Button';

type NavigationProps = {
   isLoggedIn: boolean,
   logUserOut: () => void
}

export default function Navigation({ isLoggedIn, logUserOut }: NavigationProps){


    return (
        <Navbar expand='lg' data-bs-theme='dark' bg='dark'>
            <Container fluid>
            <Navbar.Brand as={ Link } to='/'>Quiz Master</Navbar.Brand>
                <Navbar.Toggle aria-controls='nav-collapse' />
                <Navbar.Collapse id='nav-collapse'>
                    <Nav>
                        {isLoggedIn ? (
                            <>
                                <Nav.Link as={ Link } to='/myquiz'>My Quiz Questions</Nav.Link>
                                <Nav.Link as={ Link } to='/profile'>Profile</Nav.Link>
                                <Nav.Link onClick={() => logUserOut()}>Log Out</Nav.Link>
                            </>
                        ) : (
                            <>
                            <Nav.Link as={ Link } to='/signup'>Sign Up</Nav.Link>
                            <Nav.Link as={ Link } to='/login'>Log In</Nav.Link>
                            </>
                            )}
                    </Nav>
                    {/* <Nav className='me-auto'>
                        {isLoggedIn ? (
                            <>
                                <Nav.Link as={ Link } to='/'>View Quiz</Nav.Link>
                                <Nav.Link as={ Link } to='/'>Log Out</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={ Link } to='/signup'>Sign Up</Nav.Link>
                                <Nav.Link as={ Link } to='/'>Log In</Nav.Link>
                            </>
                        )}
                    </Nav> */}

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}