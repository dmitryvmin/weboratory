import React from "react";

function SvgCornerDownLeft(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="corner-down-left_svg__feather corner-down-left_svg__feather-corner-down-left"
      {...props}
    >
      <path d="M9 10l-5 5 5 5" />
      <path d="M20 4v7a4 4 0 01-4 4H4" />
    </svg>
  );
}

export default SvgCornerDownLeft;
