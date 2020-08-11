import React from "react";

function SvgCornerLeftDown(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="corner-left-down_svg__feather corner-left-down_svg__feather-corner-left-down"
      {...props}
    >
      <path d="M14 15l-5 5-5-5" />
      <path d="M20 4h-7a4 4 0 00-4 4v12" />
    </svg>
  );
}

export default SvgCornerLeftDown;
