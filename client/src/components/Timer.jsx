import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { BoggleContext } from "../state/boggleContext";
import { END_GAME } from "../state/boggleActionTypes";
export default function Timer({ totalTimeInSec, wrapperCssClass }) {
  let { state, dispatch } = useContext(BoggleContext);
  const [timeRemaining, setTimeRemaining] = useState(totalTimeInSec);
  useEffect(() => {
    //console.log(timeRemaining);
    if (!timeRemaining) {
      dispatch({ type: END_GAME });
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
      <div className={wrapperCssClass}>
        <span>⏳ &#9; {timeRemaining} sec.</span>
      </div>
    </>
  );
}

Timer.propTypes = {
  totalTimeInSec: PropTypes.number.isRequired
};
