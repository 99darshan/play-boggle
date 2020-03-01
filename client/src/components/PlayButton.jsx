import React from "react";
import "../styles/boggle.scss";

export default function PlayButton({ label, onClick }) {
  return (
    <>
      <div className="button-wrapper" onClick={onClick}>
        {label}
      </div>
    </>
  );
}
