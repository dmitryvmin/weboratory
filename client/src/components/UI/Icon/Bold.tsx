import React from "react";

function SvgBold(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="bold_svg__feather bold_svg__feather-bold"
      {...props}
    >
      <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6zM6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
    </svg>
  );
}

export default SvgBold;
