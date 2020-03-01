import {
  END_GAME,
  START_GAME,
  API_FETCH_START,
  API_FETCH_ERROR,
  FETCH_BOGGLE_ENDPOINT_SUCCESS,
  ADD_CORRECT_WORDS,
  ADD_INCORRECT_WORDS,
  UPDATE_SCORE
} from "./boggleActionTypes";
import initialBoggleState from './boggleStore';
export const boggleReducer = (state, {type,payload}) => {
  switch (type) {
    case END_GAME:
      return { ...state, hasGameEnded: true };
    // reset state to intial state when start game action is dispatched
    case START_GAME:
      return {...initialBoggleState};
    case API_FETCH_START:
      return { ...state, isFetching: true };
    case API_FETCH_ERROR:
      return {
        ...state,
        isFetching: false,
        hasError: true,
        error: payload.error
      };
    case FETCH_BOGGLE_ENDPOINT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        boggleBoard: [...payload.board],
        validWords: [...payload.words],
        hasError: false
      };
    case ADD_CORRECT_WORDS:
        return{
            ...state,
            correctWords:[...payload.correctWords]
        };
    case ADD_INCORRECT_WORDS:
        return{
            ...state,
            incorrectWords:[...payload.incorrectWords]
        }
    case UPDATE_SCORE:
        return{
            ...state,
            score:payload.score
        }
    
    default:
      return { ...state };
  }
  // TODO: switch action type, based on action type modify the existing state and create a new one
};
