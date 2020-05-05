import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import getCurrentTime from '../utils/TimeStamp';

export default function NewMessageForm() {

    const { queued, jwt, userName, setIsAuthenticated } = useContext(GlobalContext);
    const { updateQueued, updateHeaderState, updateMessageList } = useContext(GlobalContext);
    
    const [ message, setMessage ] = useState('');
    const [ newMessage, setNewMessage ] = useState('');

    useEffect(() => {
        if (newMessage === '')
            return;

        setTimeout(() => {
            updateHeaderState('Typing...');
        }, (1000 * queued) + 500)

        const msg = {
            text: newMessage,
            id: 'marcos',
            timestamp: getCurrentTime()
        }

        setTimeout(() => {
            updateHeaderState('Online');
            updateMessageList([msg]);
            updateQueued(-1);
        }, (1000 * queued) + 1000); 
        
    }, [newMessage])

	const invokeMarcos = (newMessage) => {
		const marcosAPIEndPoint = '/getReply/?token=' + jwt; 

		fetch(marcosAPIEndPoint, {
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(newMessage),
		})
        .then((response) => {
            if (response.status === 200)
                return response.json()
            if (response.status === 401) {
                alert('Your current session has expired.');
                setIsAuthenticated(false);
            }    
            throw new Error(response.status);
        })
        .then((data) => {
            data.messages.forEach((e) => {
                updateHeaderState('Online');
                updateQueued(1);
                setNewMessage(e.message);
            })
        })  
		.catch((error) => {
			console.log('Fetch Error: ' + error)
		})
    }

	const sendMessage = (text) => {
		const message = {
			text,
			id: 'user',
			timestamp: getCurrentTime()
		}

		updateMessageList([message]);

		setTimeout((message) => {
			invokeMarcos({
				message: message.text,
				username: userName
			})
		}, 500, message)
	}

    function handleChange(e) {
        let str = e.target.value;
        str = str.charAt(0).toUpperCase() + (str.length > 1 ? str.slice(1) : '');
        setMessage(str);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (message === '') {
            alert('What the hell does that mean? Message cannot be empty!');
            return;
        }

        sendMessage(message);
        setMessage('');  
    }

    return (
        <form 
            className = "new-message-form"
            onSubmit = { handleSubmit } >
            <input 
                className = "new-message-input"
                onChange = { handleChange }
                value = { message }
                placeholder = 'Start typing your message and hit ENTER to send.'
                type = 'text' 
                onFocus = { (e) => { 
                    e.target.style.backgroundColor = 'var(--secondary-color)';
                }} 
                onBlur = { (e) => { 
                    e.target.style.backgroundColor = 'var(--main-text-color)';
                }} >
            </input>        
        </form>
    )
}