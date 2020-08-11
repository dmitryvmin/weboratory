import React from "react";

function SvgArrowUpLeft(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="arrow-up-left_svg__feather arrow-up-left_svg__feather-arrow-up-left"
      {...props}
    >
      <path d="M17 17L7 7M7 17V7h10" />
    </svg>
  );
}

export default SvgArrowUpLeft;
