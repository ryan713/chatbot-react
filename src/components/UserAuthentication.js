import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import UserDetailsForm from './UserDetailsForm';

export default function UserAuthentication() {

    const { isPrevUser, setPrevUser } = useContext(GlobalContext);
    const { isAuthenticated, setIsAuthenticated } = useContext(GlobalContext);

    function handleGoBackClick() {
        setIsAuthenticated(true);
    }

    function handlePrevNewUserClick() {
        setPrevUser(!isPrevUser);
    }

    if (isAuthenticated)
        return ( <div/> )

    return (
        <div className = 'popup'>
            <div className = 'popup-outer'/> 
            <div className = 'popup-inner'>
                <div className = 'login-signup' >
                    { isPrevUser ? 'Login with your account' : 'Sign in with your account.' }
                </div>
                <UserDetailsForm />
                <div className = 'txt-nav-btn'>
                    <div className = 'goback' onClick = { handleGoBackClick }>
                        Go Back?
                    </div>            
                    <hr className = 'txt-nav-btn-hr' />  
                    <div className = 'prev-new-user' onClick = { handlePrevNewUserClick } >
                        { isPrevUser ? 'New User? Sign In!' : 'Already a User? Login!' } 
                    </div>
                </div>
            </div>
        </div>
    );
}