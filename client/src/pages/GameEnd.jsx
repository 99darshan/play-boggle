import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../constants/routeConstants";

function GameEnd() {
  return (
    <div>
      <p>Game Over</p>
      <Link to={routes.GAME}>Play Again</Link>
    </div>
  );
}

export default GameEnd;
