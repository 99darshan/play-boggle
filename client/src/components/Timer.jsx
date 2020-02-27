import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { BoggleContext } from "../state/boggleContext";
import { END_GAME } from "../state/boggleActionTypes";
export default function Timer({ totalTimeInSec }) {
  let { state, dispatch } = useContext(BoggleContext);
  const [timeRemaining, setTimeRemaining] = useState(totalTimeInSec);
  useEffect(() => {
    //console.log(timeRemaining);
    //console.log("use effect");
    // stop timer when timeRemaining is 0 TODO: display game end views
    if (!timeRemaining) {
      dispatch({ type: END_GAME, payload: { hasGameEnded: true } });
      return;
    }
    const timerIntervalId = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);
    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(timerIntervalId);

    // re-run effect when timeRemaining is updated
  }, [timeRemaining]);
  return (
    <>
      <h2>&#128368; {timeRemaining} seconds</h2>
    </>
  );
}

Timer.propTypes = {
  totalTimeInSec: PropTypes.number.isRequired
};
