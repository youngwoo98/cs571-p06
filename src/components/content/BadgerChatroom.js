import React, { useEffect, useState } from "react"
import {Form, Button} from "react-bootstrap"
import BadgerMessage from "./BadgerMessage";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
      

    const loadMessages = () => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_c49825b5bd469d794555"
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    useEffect(() => {
        loadMessages()
    }, [props]);


    const postIt = () => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            method: 'POST',            
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_c49825b5bd469d794555",
            },
            body: JSON.stringify({
                title: ttl,
                content: cont
            })
        }).then(res => {
            if(res.status === 200){
                alert("Successfully posted message!");
                loadMessages()
            }
            else if(res.status === 401){
                alert("You must be logged in to post!")               
            }
        })
    }


    const deletePost = (id) => {
        fetch(`https://www.cs571.org/s23/hw6/api/chatroom/${props.name}/messages/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                "X-CS571-ID": "bid_c49825b5bd469d794555",
            },
        })
        .then(res => {
            if(res.status === 200){
                alert("Successfully deleted message!");
                loadMessages();
            }
        })
    }

    
    
    const[ttl, setTitle] = useState("");
    const[cont, setContent] = useState("");

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO: Allow an authenticated user to create a post. */
            <Form>
            <Form.Label htmlFor="ttl">Post Title</Form.Label>
            <Form.Control 
                id="ttl"
                value = {ttl}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Label htmlFor="cont">Post Content</Form.Label>
            <Form.Control 
                id="cont"
                value = {cont}
                onChange={(e) => setContent(e.target.value)}
            />
            <br />
            <Button 
                onClick={(e) => {
                    if(ttl !== "" && cont !== ""){
                        postIt();
                    }
                    else{
                        alert("You must provide both a title and content!");
                    }
                }}
            >Create Post</Button>
        </Form>
            
        }
        <hr/>
        {
            messages.length > 0 ?
                <>
                    {
                        messages.map(prop => 
                        <BadgerMessage {...prop} key={`${prop.poster}+${prop.id}`} deletePost={deletePost}>
            
                        </BadgerMessage>)
                    }
                </>
                :
                <>
                    <p>There are no messages in this chatroom yet!</p>
                </>
        }
    </>
}