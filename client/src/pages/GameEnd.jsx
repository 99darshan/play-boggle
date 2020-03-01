import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import * as routes from "../constants/routeConstants";
import { BoggleContext } from "../state/boggleContext";
import { START_GAME } from "../state/boggleActionTypes";
import PlayButton from "../components/PlayButton";
import "../styles/boggle.scss";
import Divider from "@material-ui/core/Divider";

function GameEnd() {
  let { state, dispatch } = useContext(BoggleContext);
  console.log(state.hasGameEnded);
  return (
    <div className="game-end-wrapper">
      <h1>GAME OVER</h1>
      <Link
        to={routes.GAME}
        style={{ textDecoration: "inherit", color: "inherit" }}
      >
        <PlayButton
          label="Play Again"
          cssClass="play-button"
          handleClick={() => dispatch({ type: START_GAME })}
        />
      </Link>
      {/* Only dispaly previous game info on game end, hide on manual navigation to the route */}
      {state.hasGameEnded && (
        <div className="prev-game-info-wrapper">
          <h2>🏆 &#9; &#9; {state.score}</h2>
          <div>
            <p>
              You Found {state.correctWords.length} words out of possible{" "}
              {state.validWords.length}
            </p>
            <Divider />
          </div>

          <div className="word-lists">
            {state.validWords.map(word => (
              <p
                className={
                  state.correctWords.includes(word)
                    ? "found-word"
                    : "word-not-found"
                }
              >
                {word + ","}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GameEnd;
