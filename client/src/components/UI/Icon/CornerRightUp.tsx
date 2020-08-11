import React from "react";

function SvgCornerRightUp(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="corner-right-up_svg__feather corner-right-up_svg__feather-corner-right-up"
      {...props}
    >
      <path d="M10 9l5-5 5 5" />
      <path d="M4 20h7a4 4 0 004-4V4" />
    </svg>
  );
}

export default SvgCornerRightUp;
