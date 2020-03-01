import React from "react";

export default function PlayButton({ label, handleClick, cssClass }) {
  return (
    <>
      <div className={cssClass} onClick={handleClick}>
        {label}
      </div>
    </>
  );
}
