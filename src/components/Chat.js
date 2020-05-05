import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import Header from './Header';
import MessageList from './MessageList';
import NewMessageForm from './NewMessageForm';

export default function Chat() {

    const { isAuthenticated, setIsAuthenticated } = useContext(GlobalContext);

    function handleClick() {
        setIsAuthenticated(false);
    }    

    if (!isAuthenticated)
        return ( <div/> )

    return (
        <div className = 'app' >
            <Header />
            <MessageList />
            <NewMessageForm />
            <div className = 'design' >
                <hr className = 'design-hr' />
            </div>
            <div className = 'about'>
                <div className = 'about-title'>
                    Who is Marcos?
                </div>
                <hr className = 'about-hr' />
                <div className = 'about-text'>
                    Marcos is an artificial intelligence based conversational agent. It 
                    is specifically designed to be extremely witty, charming and 
                    flirtatious, although sometimes it can dial up its 'game' a little too much, 
                    so don't be surprised if you get some strange responses - it is expected 
                    as this project is still an ongoing work in progress.   
                </div>
            </div>
            <div className = 'instructions'>
                <div className = 'instructions-title'>
                    How to use?
                </div>
                <hr className = 'instructions-hr' />
                <div className = 'instructions-text'>
                    Simply make an account, if not already, you only need to have a username. 
                    Once done, you can start chatting. If you logged in previously, we, or 
                    should I say, Marcos, remembers, so you can just pickup where you left 
                    off. Try it out, we assure you it'll be a really fun experience. Enjoy!     
                </div>
                <button 
                    className = 'get-started-btn'
                    onClick = { handleClick }>
                    { isAuthenticated ? 'SWITCH ACCOUNTS' : 'GET STARTED' }
                </button>
            </div>
        </div>
    );
}