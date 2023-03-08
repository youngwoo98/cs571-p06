import React, { useContext } from 'react';
import { useState } from 'react';
import { Button, Form} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import DataContext from '../../contexts/DataContext';


export default function BadgerRegister() {

    const navigate = useNavigate();
    const [data, setData] = useContext(DataContext);

    // TODO Create the register component.
    const register = () => {
        fetch('https://cs571.org/s23/hw6/api/register', {
            method: 'POST',            
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_c49825b5bd469d794555",
            },
            body: JSON.stringify({
                username: usr,
                password: pw
            })
        }).then(res => {
            if(res.status === 200){
                alert("Successfully created user!");
                sessionStorage.setItem('logged_in', 'yes');
                sessionStorage.setItem('username', usr);
                setData({
                    username: usr
                })
                navigate('/')
            }
            else if(res.status === 409){
                alert("That username has already been taken!")               
            }
        })
    }

    const[usr, setUSR] = useState("");
    const[pw, setPW] = useState("");
    const[rpw, setRPW] = useState("");

    return <>
        <h1>Register</h1>
        <Form>
            <Form.Label htmlFor="usr">Username</Form.Label>
            <Form.Control 
                id="usr"
                value = {usr}
                onChange={(e) => setUSR(e.target.value)}
            />
            <Form.Label htmlFor="pw">Password</Form.Label>
            <Form.Control 
                id="pw"
                value = {pw}
                type = "password"
                onChange={(e) => setPW(e.target.value)}
            />
            <Form.Label htmlFor="rpw">Repeat Password</Form.Label>
            <Form.Control 
                id="rpw"
                value = {rpw}
                type = "password"
                onChange={(e) => setRPW(e.target.value)}
            />
            <br />
            <Button 
                onClick={(e) => {
                    if(usr !== "" && pw !== ""){
                        if(pw === rpw){
                            register()
                        }
                        else{
                            alert("Your passwords do not match!");
                        }
                    }
                    else{
                        alert("You must provide both a username and password!");
                    }
                }}
            >Register</Button>
        </Form>
    </>
}