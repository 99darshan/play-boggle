import React from "react";
import { Link } from "react-router-dom";
import { GAME } from "../constants/routeConstants";
import GitHubIcon from "@material-ui/icons/GitHub";
import { IconButton } from "@material-ui/core";

import "../styles/boggle.scss";
export default function Home() {
  return (
    <>
      <div className="home-wrapper">
        <div className="github-button">
          <IconButton
            aria-label="Github"
            onClick={() => {
              window.open("https://github.com/99darshan/play-boggle", "_blank");
            }}
          >
            <GitHubIcon fontSize="large" color="secondary" />
          </IconButton>
        </div>

        <h1>BOGGLE</h1>
        <Link to={GAME}>
          <button>Play Boggle</button>
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
          <div className="about">
            <h4>Rules</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit iusto
              a assumenda nesciunt architecto, pariatur, deserunt et sint velit
              rem, quas excepturi veritatis repudiandae odit nam delectus eum
              quam dignissimos. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Sit iusto a assumenda nesciunt architecto,
              pariatur, deserunt et sint velit rem, quas excepturi veritatis
              repudiandae odit nam delectus eum quam dignissimos.Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Sit iusto a assumenda
              nesciunt architecto, pariatur, deserunt et sint velit rem, quas
              excepturi veritatis repudiandae odit nam delectus eum quam
              dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Sit iusto a assumenda nesciunt architecto, pariatur,
              deserunt et sint velit rem, quas excepturi veritatis repudiandae
              odit nam delectus eum quam dignissimos.Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Sit iusto a assumenda nesciunt
              architecto, pariatur, deserunt et sint velit rem, quas excepturi
              veritatis repudiandae odit nam delectus eum quam dignissimos.Lorem
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
