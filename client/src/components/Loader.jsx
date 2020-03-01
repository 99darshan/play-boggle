import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loader({ cssClass }) {
  return (
    <div className={cssClass}>
      <CircularProgress />
      <p>Hold your horses...</p>
      <p>Ain't nobody got time to wait, but my algorithm is meh so 🤷‍♀️ 🤦‍♀️ </p>
    </div>
  );
}
