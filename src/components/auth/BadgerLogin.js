import React, { useContext } from 'react';
import { useRef } from 'react';
import { Form, Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import DataContext from '../../contexts/DataContext';

export default function BadgerLogin() {

    const navigate = useNavigate();

    const [data, setData] = useContext(DataContext);

    // TODO Create the login component.
    const login = () => {
        fetch('https://cs571.org/s23/hw6/api/login', {
            method: 'POST',            
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_c49825b5bd469d794555",
            },
            body: JSON.stringify({
                username: inputUSR.current.value,
                password: inputPW.current.value
            })
        }).then(res => {
            if(res.status === 200){
                alert("Login was successful!");
                sessionStorage.setItem('logged_in', "yes");
                sessionStorage.setItem('username', inputUSR.current.value);
                setData({
                    username: inputUSR.current.value
                })

                navigate('/');
            }
            else if(res.status === 401){
                alert("Incorrect password");
            }
            else if(res.status === 404){
                alert("Incorrect username!");
            }            
        })
    }

    
    const inputUSR = useRef();
    const inputPW = useRef();

    

    return <>
        <h1>Login</h1>
        <Form>
            <Form.Label htmlFor="usr">Username</Form.Label>
            <Form.Control
                id="usr"
                ref = {inputUSR}
            />
            <Form.Label htmlFor="pw">Password</Form.Label>
            <Form.Control 
                id="pw"
                type="password"
                ref = {inputPW}
            />
            <br />
            <Button 
                onClick={(e) => {
                    if(inputUSR.current.value !== "" && inputPW.current.value !== ""){
                        login();
                    }
                    else{
                        alert("You must provide both a username and password!");
                    }
                }}
            >Login</Button>
        </Form>
 
    </>
}