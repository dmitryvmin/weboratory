import React from "react";

function SvgSlash(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="slash_svg__feather slash_svg__feather-slash"
      {...props}
    >
      <circle cx={12} cy={12} r={10} />
      <path d="M4.93 4.93l14.14 14.14" />
    </svg>
  );
}

export default SvgSlash;
