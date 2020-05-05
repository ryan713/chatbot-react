import React, { useReducer } from 'react';
import AppReducer from '../context/AppReducer';
import { initialState, GlobalContext } from '../context/GlobalContext';

export function GlobalProvider({ children }) {

    const [state, dispatch] = useReducer(AppReducer, initialState);

    function updateHeaderState(headerState) {
        dispatch({
            type: 'UPDATE_HEADER_STATE',
            payload: headerState
        });
    }

    function updateMessageList(message) {
        dispatch({
            type: 'ADD_MESSAGES',
            payload: message
        });
    }

    function updateQueued(value) {
        dispatch({
            type: 'UPDATE_QUEUED',
            payload: value
        });
    }

    function setPrevUser(value) {
        dispatch({
            type: 'UPDATE_PREV_USER',
            payload: value
        })
    }

    function setUserName(value) {
        dispatch({
            type: 'UPDATE_USERNAME',
            payload: value
        })
    }

    function setIsAuthenticated(value) {
        dispatch({
            type: 'UPDATE_AUTHENTICATED',
            payload: value
        })
    }

    function setJWT(value) {
        dispatch({
            type: 'UPDATE_JWT',
            payload: value
        })
    }

    function clearMessageList() {
        dispatch({
            type: 'CLEAR_MESSAGES'
        })
    }

    return (
        <GlobalContext.Provider value = {{
            messages: state.messages,
            headerState: state.headerState,
            queued: state.queued,
            isPrevUser: state.isPrevUser,
            userName: state.userName,
            isAuthenticated: state.isAuthenticated,
            jwt: state.jwt,
            updateHeaderState,
            updateMessageList,
            updateQueued,
            setPrevUser,
            setUserName,
            setIsAuthenticated,
            setJWT,
            clearMessageList
        }}>
            { children }
        </GlobalContext.Provider>
    )
};
