import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loader({ cssClass }) {
  return (
    <div className={cssClass}>
      <CircularProgress color="inherit" />
      <p>Hold your horses...</p>
      <p>
        Ain't nobody got time to wait, but my algorithm is meh so{" "}
        <span role="img" aria-label="shrugging">
          🤷‍♀️{" "}
        </span>
        <span role="img" aria-label="facepalm">
          🤦‍♀️
        </span>
      </p>
    </div>
  );
}
