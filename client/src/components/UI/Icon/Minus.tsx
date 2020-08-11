import React from "react";

function SvgMinus(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="minus_svg__feather minus_svg__feather-minus"
      {...props}
    >
      <path d="M5 12h14" />
    </svg>
  );
}

export default SvgMinus;
