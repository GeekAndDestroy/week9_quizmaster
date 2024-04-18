// import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import Button from 'react-bootstrap/Button';

type NavigationProps = {
   
}

export default function Navigation({  }: NavigationProps){


    return (
        <Navbar expand='lg' data-bs-theme='dark' bg='dark'>
            <Container fluid>
            <Navbar.Brand as={ Link } to='/'>Quiz Master</Navbar.Brand>
                <Navbar.Toggle aria-controls='nav-collapse' />
                <Navbar.Collapse id='nav-collapse'>
                    <Nav.Link as={ Link } to='/signup'>Sign Up</Nav.Link>
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
                    <Nav>
                       
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}