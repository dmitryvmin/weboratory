import React from "react";

function SvgCheck(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="check_svg__feather check_svg__feather-check"
      {...props}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default SvgCheck;
