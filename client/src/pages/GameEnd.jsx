import React, { useContext } from "react";
import { Link } from "react-router-dom";
import * as routes from "../constants/routeConstants";
import { BoggleContext } from "../state/boggleContext";
import { START_GAME } from "../state/boggleActionTypes";

function GameEnd() {
  let { state, dispatch } = useContext(BoggleContext);
  return (
    <div>
      <p>Game Over</p>
      <Link to={routes.GAME}>
        <button onClick={() => dispatch({ type: START_GAME })}>
          Play Again
        </button>
      </Link>

      <div>
        <p>Correct Words List: </p>
        {state.correctWords.map(word => (
          <p>{word}</p>
        ))}
      </div>
      <div>
        <p>Incorrect Words List: </p>
        {state.incorrectWords.map(word => (
          <p>{word}</p>
        ))}
      </div>
    </div>
  );
}

export default GameEnd;
