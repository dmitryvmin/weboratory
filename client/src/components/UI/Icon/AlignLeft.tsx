import React from "react";

function SvgAlignLeft(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="align-left_svg__feather align-left_svg__feather-align-left"
      {...props}
    >
      <path d="M17 10H3M21 6H3M21 14H3M17 18H3" />
    </svg>
  );
}

export default SvgAlignLeft;
