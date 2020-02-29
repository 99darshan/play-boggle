import React, { createContext,useReducer } from "react";
import {boggleReducer} from './boggleReducer';

const initialBoggleState={
    isFetching: false,
    hasError: false,
    // TODO: board and validWords will be fetched from server later
    boggleBoard:[],
    validWords:[],
    hasGameEnded: false,
    totalTimeInSec: 180,
    error: ''
}

export const BoggleContext = createContext();
export default function BoggleProvider(props){
    // useReducer hooks returns state and dispatch which are passed down as values from Providers
    let [state, dispatch] = useReducer(boggleReducer, initialBoggleState); 
    return(<BoggleContext.Provider value={{state, dispatch}}>
        {props.children}
    </BoggleContext.Provider>);
}