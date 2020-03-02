import React from "react";

export default function Error({ message }) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <span role="img" style={{ fontSize: "2rem" }}>
        {" "}
        😿 🤦‍♀️{" "}
      </span>
      <p style={{ fontFamily: "Merienda One", fontSize: "1.2rem" }}>
        {message}
      </p>
    </div>
  );
}
