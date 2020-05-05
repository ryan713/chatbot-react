import { createContext } from "react";

export const initialState = {
    messages: [],
    headerState: 'Offline',
    queued: 0,
    isPrevUser: 0,
    userName: "",
    isAuthenticated: false,
    jwt: ""
}

export const GlobalContext = createContext(initialState);