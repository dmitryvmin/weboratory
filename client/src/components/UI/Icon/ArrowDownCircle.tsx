import React from "react";

function SvgArrowDownCircle(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="arrow-down-circle_svg__feather arrow-down-circle_svg__feather-arrow-down-circle"
      {...props}
    >
      <circle cx={12} cy={12} r={10} />
      <path d="M8 12l4 4 4-4M12 8v8" />
    </svg>
  );
}

export default SvgArrowDownCircle;
