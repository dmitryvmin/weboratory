import React from "react";

function SvgArrowDownLeft(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="arrow-down-left_svg__feather arrow-down-left_svg__feather-arrow-down-left"
      {...props}
    >
      <path d="M17 7L7 17M17 17H7V7" />
    </svg>
  );
}

export default SvgArrowDownLeft;
