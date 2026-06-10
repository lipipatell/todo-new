import React from "react";

export default function Toast({ message }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "20px",
        backgroundColor: "gray",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      {message}
    </div>
  );
}