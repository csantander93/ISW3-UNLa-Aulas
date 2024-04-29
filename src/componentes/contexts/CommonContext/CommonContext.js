import React, { createContext, useReducer } from 'react';
import { CommonReducer } from './CommonReducer';


export const CommonContext = createContext();


const INITIAL_STATE = {
    loadingScreen: false,
    screenMessage: {
        message: "",
        status: 0,
        returnPath: ""
    }
}


const CommonProvider = ({ children }) => {
    const [commonState, dispatch] = useReducer(CommonReducer, INITIAL_STATE);

    const setScreenMessage = (message) => {
        dispatch({ type: 'setScreenMessage', payload: message })
    }
    const setLoadingScreen = (value) => {
        dispatch({ type: 'setLoadingScreen', payload: value })
    }


    return (
        <CommonContext.Provider value={{
            setScreenMessage,
            setLoadingScreen,
            commonState

        }}>
            {children}
        </CommonContext.Provider>
    );
};

export default CommonProvider;