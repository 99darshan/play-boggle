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
    </div>
  );
}

export default GameEnd;
