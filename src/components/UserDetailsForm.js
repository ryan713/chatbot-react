import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';

export default function UserDetailsForm() {

    const { setIsAuthenticated, setUserName, setJWT } = useContext(GlobalContext);
    const { isPrevUser, clearMessageList } = useContext(GlobalContext);

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const passwordPlaceholderText = 'Pick a strong password';
    const usernamePlaceholderText = 'Pick a unique username';

    function handleLoginSignUp() {
        const marcosAPIEndPoint = isPrevUser ? '/login/' : '/signup/';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                username: username,
                password: password
            })
        };

        fetch(marcosAPIEndPoint, requestOptions)
        .then((response) => {
            if (response.status === 200)
                return response.json();
            if (response.status === 401) 
                response.json().then((error) => alert(error.Error));
            throw new Error(response.status);    
        })
        .then((data) => {
            setJWT(data.token);
            setUserName(username);
            setIsAuthenticated(true);
            clearMessageList();
        })
        .catch((error) => {
            console.log('Fetch Error: ' + error);
        });
    }
      
    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        handleLoginSignUp();
        
        setUsername("");
        setPassword("");
    }

    return (
        <form
            onSubmit = { handleSubmit } 
            className = 'user-details-form' >
            <div
                className = 'username-field'>
                USERNAME:    
                <input
                    className = 'username-form'
                    type = 'text'
                    placeholder = { usernamePlaceholderText }
                    onChange = { handleUsernameChange }    
                    value = { username } 
                    onFocus = { (e) => e.target.placeholder = '' } 
                    onBlur = { (e) => e.target.placeholder = usernamePlaceholderText } 
                    required />
            </div>
            <div
                className = 'password-field'>
                PASSWORD:  
                <input
                    className = 'password-form'
                    type = 'password'
                    placeholder = { passwordPlaceholderText }
                    onChange = { handlePasswordChange }    
                    value = { password } 
                    onFocus = { (e) => e.target.placeholder = '' } 
                    onBlur = { (e) => e.target.placeholder = passwordPlaceholderText } 
                    required /> 
            </div>        
            <button
                className = 'login-signup-btn'
                type = 'submit' >
                    { isPrevUser ? 'LOGIN' : 'SIGN IN' }     
            </button>
        </form>
    )
}