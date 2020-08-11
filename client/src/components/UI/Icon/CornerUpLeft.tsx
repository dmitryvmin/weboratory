import React from "react";

function SvgCornerUpLeft(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="corner-up-left_svg__feather corner-up-left_svg__feather-corner-up-left"
      {...props}
    >
      <path d="M9 14L4 9l5-5" />
      <path d="M20 20v-7a4 4 0 00-4-4H4" />
    </svg>
  );
}

export default SvgCornerUpLeft;
