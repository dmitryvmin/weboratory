import React from "react";

function SvgChevronsLeft(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="chevrons-left_svg__feather chevrons-left_svg__feather-chevrons-left"
      {...props}
    >
      <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
    </svg>
  );
}

export default SvgChevronsLeft;
