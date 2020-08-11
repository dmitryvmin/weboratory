import React from "react";

function SvgCornerDownRight(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="corner-down-right_svg__feather corner-down-right_svg__feather-corner-down-right"
      {...props}
    >
      <path d="M15 10l5 5-5 5" />
      <path d="M4 4v7a4 4 0 004 4h12" />
    </svg>
  );
}

export default SvgCornerDownRight;
