import React from "react";

function SvgChevronsUp(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="chevrons-up_svg__feather chevrons-up_svg__feather-chevrons-up"
      {...props}
    >
      <path d="M17 11l-5-5-5 5M17 18l-5-5-5 5" />
    </svg>
  );
}

export default SvgChevronsUp;
