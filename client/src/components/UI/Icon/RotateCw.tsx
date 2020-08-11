import React from "react";

function SvgRotateCw(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="rotate-cw_svg__feather rotate-cw_svg__feather-rotate-cw"
      {...props}
    >
      <path d="M23 4v6h-6" />
      <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
    </svg>
  );
}

export default SvgRotateCw;
