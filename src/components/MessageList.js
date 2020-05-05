import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'
import { GlobalContext } from '../context/GlobalContext';

export default class MessageList extends React.Component {
    
    componentDidMount() {
        this.messageList = ReactDOM.findDOMNode(this);
    }
            
    componentDidUpdate() {
        this.messageList.scrollTop = this.messageList.scrollHeight;
    }

    render() {
        if (this.context.messages.length === 0) {
            return (
                <div className = 'empty-message-list'>
                    Marcos doesn't like to text first, you're gonna have to step up!
                </div>
            )
        }
        return (
            <div className = "message-list">
                { this.context.messages.map((message, index) => {
                    return (
                        <Message key = { index } message = { message }/>
                    )
                })}
            </div>
        );
    }
};

MessageList.contextType = GlobalContext;