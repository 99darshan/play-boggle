import React from "react";
import { Link } from "react-router-dom";
import { GAME } from "../constants/routeConstants";
export default function Home() {
  return (
    <>
      <Link to={GAME}>
        <button>Play Boggle</button>
      </Link>
    </>
  );
}
