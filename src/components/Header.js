import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import getCurrentTime from '../utils/TimeStamp';

export default function Header() {

    const { headerState, updateHeaderState, userName, jwt, setIsAuthenticated, updateMessageList } = useContext(GlobalContext);

    function checkMarcosStatus() {
        const marcosAPIEndPoint = '/marcos/?token=' + jwt;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ username: userName })
        }

        fetch(marcosAPIEndPoint, requestOptions)
        .then((response) => {
            if (response.status === 200) {
                updateHeaderState('Online');
                return response.json();
            }
            if (response.status === 401) {
                setIsAuthenticated(false);
                console.log(response.json())
            }
            throw new Error(response.status);
        })
        .then((data) => {
            const messages = data.messages.messages;
            const prevChat = messages.map((m) => {
                return {
                    text: m.message,
                    id: m.sender === undefined ? m.username : m.sender,
                    timestamp: getCurrentTime()
                }
            });
            updateMessageList(prevChat);
        })
        .catch((error) => {
            console.log('Fetch Error: ' + error)
        })
    }

    useEffect(() => {
        setTimeout(() => {
            checkMarcosStatus();
        }, 2500);
    }, []);

    return (
        <div className = "header">
            <div className = "title"> Marcos Rodriguez </div>
            <div className = "bot-status">
                <div className = { headerState === 'Offline' ? "bot-status-off" : "bot-status-on" } />    
                <div className = "bot-state"> { headerState } </div>
            </div>
        </div>    
    )
}