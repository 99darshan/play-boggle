import {END_GAME, START_GAME} from './boggleActionTypes'
export const boggleReducer = (state, action) => {
    switch(action.type){
        case END_GAME:
           return {...state, hasGameEnded: action.payload.hasGameEnded};
        case START_GAME:
            return {...state, hasGameEnded: false}
        default:
            return {...state}; 
    }
    // TODO: switch action type, based on action type modify the existing state and create a new one
}