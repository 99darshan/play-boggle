import React, { createContext,useReducer } from "react";
import {boggleReducer} from './boggleReducer';

const initialBoggleState={
    isFetching: false,
    hasError: false,
    // TODO: board and validWords will be fetched from server later
    board:[['a','d','r'],['d','t','c'],['i','j','o']],
    validWords:["test","dummy","list"],
    hasGameEnded: false,
    totalTimeInSec: 5
}

export const BoggleContext = createContext();
export default function BoggleProvider(props){
    // useReducer hooks returns state and dispatch which are passed down as values from Providers
    let [state, dispatch] = useReducer(boggleReducer, initialBoggleState); 
    return(<BoggleContext.Provider value={{state, dispatch}}>
        {props.children}
    </BoggleContext.Provider>);
}