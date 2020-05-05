export default (state, action) => {
    switch(action.type) {
        case 'UPDATE_QUEUED':
            return {
                ...state,
                queued: state.queued + action.payload
            }
        case 'UPDATE_HEADER_STATE':
            return {
                ...state,
                headerState: action.payload
            }
        case 'ADD_MESSAGES':
            return {
                ...state,
                messages: [...state.messages, ...action.payload]
            }
        case 'UPDATE_PREV_USER': 
            return {
                ...state,
                isPrevUser: action.payload
            } 
        case 'UPDATE_USERNAME': 
            return {
                ...state,
                userName: action.payload
            }   
        case 'UPDATE_AUTHENTICATED': 
            return {
                ...state,
                isAuthenticated: action.payload
            }   
        case 'UPDATE_JWT': 
            return {
                ...state,
                jwt: action.payload
            }
        case 'CLEAR_MESSAGES':
            return {
                ...state,
                messages: []
            }                    
        default:
            return state;
    }
}