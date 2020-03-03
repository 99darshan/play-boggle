import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GAME } from "../constants/routeConstants";
import GitHubIcon from "@material-ui/icons/GitHub";
import { IconButton } from "@material-ui/core";
import PlayButton from "../components/PlayButton";
import Divider from "@material-ui/core/Divider";
import { START_GAME } from "../state/boggleActionTypes";
import "../styles/boggle.scss";
import { BoggleContext } from "../state/boggleContext";
export default function Home() {
  let { dispatch } = useContext(BoggleContext);
  return (
    <>
      <div className="fx-btn-gh">
        <IconButton
          color="inherit"
          aria-label="Github"
          onClick={() => {
            window.open("https://github.com/99darshan/play-boggle", "_blank");
          }}
        >
          <GitHubIcon fontSize="large" />
        </IconButton>
      </div>
      <div className="home-wrapper">
        <h1>BOGGLE</h1>

        <Link to={GAME} style={{ textDecoration: "inherit", color: "inherit" }}>
          <PlayButton
            label="Play"
            cssClass="play-button"
            handleClick={() => dispatch({ type: START_GAME })}
          />
        </Link>

        <div className="desc-wrapper">
          <div className="about">
            <h4>About Game</h4>
            <p>
              - Boggle is a word game invented by Allan Turoff and originally
              distributed by Parker Brothers.
            </p>
            <p>
              - Discover as many words as possible from a 4*4 grid of randomly
              selected letters.
            </p>
            <p>
              - A valid word can only be formed if each letter is contiguous
              (i.e. side-by-side, above or below, or on the diagonal) with the
              next, and no letter position can be used more than once in any
              given word.
            </p>
            <p>- A valid word should have at least 3 letters.</p>
            <p>- Score += 1 * number of letters in the word.</p>
          </div>

          <div className="footer">
            <Divider />
            <br />
            <span>
              Made with{" "}
              <span role="img" aria-label="heart">
                💜{" "}
              </span>
              <span role="img" aria-label="coffee">
                ☕{" "}
              </span>
              !
              <span role="img" aria-label="no-sleep">
                💤
              </span>{" "}
              by{" "}
              <a href="https://www.linkedin.com/in/99darshan/" target="_blank">
                @99darshan
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
