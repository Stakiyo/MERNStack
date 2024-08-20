import React from "react";
import "../UserComponents/CircleCheck.css";
function CircleCheck() {
  return (
    <>
      <svg
        width="100"
        height="100"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4"
      >
        <circle
          id="circle-tick"
          cx="50"
          cy="50"
          r="45"
          fill="#28a745"
          stroke="#FFFFFF"
          strokeWidth="3"
        />

        <path
          d="M30,50 L45,65 L70,40"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="5"
        />
      </svg>
    </>
  );
}

export default CircleCheck;
