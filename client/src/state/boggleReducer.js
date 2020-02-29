import {
  END_GAME,
  START_GAME,
  API_FETCH_START,
  API_FETCH_ERROR,
  FETCH_BOGGLE_ENDPOINT_SUCCESS
} from "./boggleActionTypes";
export const boggleReducer = (state, action) => {
  switch (action.type) {
    case END_GAME:
      return { ...state, hasGameEnded: true };
    case START_GAME:
      return { ...state, hasGameEnded: false };
    case API_FETCH_START:
      return { ...state, isFetching: true };
    case API_FETCH_ERROR:
      return {
        ...state,
        isFetching: false,
        hasError: true,
        error: action.payload.error
      };
    case FETCH_BOGGLE_ENDPOINT_SUCCESS:
        return{
            ...state,
            isFetching: false,
            boggleBoard: [...action.payload.board],
            validWords: [...action.payload.words],
            hasError: false
        }
    default:
      return { ...state };
  }
  // TODO: switch action type, based on action type modify the existing state and create a new one
};
