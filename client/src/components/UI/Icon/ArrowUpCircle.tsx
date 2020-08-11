import React from "react";

function SvgArrowUpCircle(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="arrow-up-circle_svg__feather arrow-up-circle_svg__feather-arrow-up-circle"
      {...props}
    >
      <circle cx={12} cy={12} r={10} />
      <path d="M16 12l-4-4-4 4M12 16V8" />
    </svg>
  );
}

export default SvgArrowUpCircle;
