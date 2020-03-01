import React, { createContext,useReducer } from "react";
import {boggleReducer} from './boggleReducer';
import initialBoggleState from './boggleStore';

export const BoggleContext = createContext();
export default function BoggleProvider(props){
    // useReducer hooks returns state and dispatch which are passed down as values from Providers
    let [state, dispatch] = useReducer(boggleReducer, initialBoggleState); 
    return(<BoggleContext.Provider value={{state, dispatch}}>
        {props.children}
    </BoggleContext.Provider>);
}