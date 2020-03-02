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
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis
              dolore inventore similique, corrupti temporibus nihil repellat,
              esse asperiores minima explicabo magni tempore vel, mollitia
              perferendis. Tenetur deleniti in modi vitae.
            </p>
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
