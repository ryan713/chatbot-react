import React from 'react'
 
function Message(props) {
    return (
        <div className = { props.message.id === 'marcos' ? 'message-left' : 'message-right'} >
            <div className = 'message-text'> 
                { props.message.text }
             </div>
            <div className = { props.message.id === 'marcos' ? 'timestamp-left' : 'timestamp-right' } > 
                { props.message.timestamp } 
            </div>
        </div>
    )
};

export default Message;