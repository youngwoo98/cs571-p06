import { Button } from "react-bootstrap";


function BadgerMessage(props) {

    const usr = sessionStorage.getItem("username");

    const dt = new Date(props.created);


    const handleDelete = () => {
        props.deletePost(props.id);
    }


    return <>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/><br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {
            props.poster === usr ?
            <Button
                onClick={handleDelete}
                variant = "danger"
            >Delete Post</Button>
            :
            <></>
        }
    </>
}

export default BadgerMessage;