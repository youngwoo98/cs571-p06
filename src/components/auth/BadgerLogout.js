import React, { useContext, useEffect } from 'react';
import DataContext from '../../contexts/DataContext';

export default function BadgerLogout() {
    const [data, setData] = useContext(DataContext);

    useEffect(() => {
        fetch('https://cs571.org/s23/hw6/api/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": "bid_c49825b5bd469d794555"
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            // Maybe you need to do something here?
            sessionStorage.setItem('logged_in', "no");
            sessionStorage.setItem('username', "")
            setData({
                username: ""
            })

        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}