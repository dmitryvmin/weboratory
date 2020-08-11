import React from "react";

function SvgPlus(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="plus_svg__feather plus_svg__feather-plus"
      {...props}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export default SvgPlus;
