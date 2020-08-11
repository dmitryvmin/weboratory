import React from "react";

function SvgChevronLeft(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="chevron-left_svg__feather chevron-left_svg__feather-chevron-left"
      {...props}
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export default SvgChevronLeft;
