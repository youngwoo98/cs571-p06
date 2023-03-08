import React, { createContext, useContext, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

import crest from '../../assets/uw-crest.svg'

import DataContext from "../../contexts/DataContext";

function BadgerLayout(props) {
    const [data, setData] = useContext(DataContext);

    return (
        <div>
            <DataContext.Provider value ={[data, setData]}>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <>
                        {
                            sessionStorage.getItem('logged_in') === 'yes' ?
                            <>
                                <Nav.Link as={Link} to="logout">Logout</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link as={Link} to="login">Login</Nav.Link>
                                <Nav.Link as={Link} to="register">Register</Nav.Link>
                            </>
                        }
                        </>
                        <NavDropdown title="Chatrooms">
                            {
                               Object.values(props)[0].map(prop => <NavDropdown.Item as={Link} to={`chatrooms/${prop}`} key={prop}>{prop}</NavDropdown.Item>)
                            }
                        </NavDropdown>

                    </Nav>
                </Container>
            </Navbar>
            </DataContext.Provider>
            <div className="body-spacer">
                <Outlet />
            </div>
        </div>
    );
}

export default BadgerLayout;