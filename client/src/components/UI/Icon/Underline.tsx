import React from "react";

function SvgUnderline(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="underline_svg__feather underline_svg__feather-underline"
      {...props}
    >
      <path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3M4 21h16" />
    </svg>
  );
}

export default SvgUnderline;
