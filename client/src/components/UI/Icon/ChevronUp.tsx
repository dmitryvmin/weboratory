import React from "react";

function SvgChevronUp(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="chevron-up_svg__feather chevron-up_svg__feather-chevron-up"
      {...props}
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

export default SvgChevronUp;
