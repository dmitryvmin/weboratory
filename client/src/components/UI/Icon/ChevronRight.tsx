import React from "react";

function SvgChevronRight(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="chevron-right_svg__feather chevron-right_svg__feather-chevron-right"
      {...props}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default SvgChevronRight;
