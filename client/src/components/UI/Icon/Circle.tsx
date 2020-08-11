import React from "react";

function SvgCircle(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="circle_svg__feather circle_svg__feather-circle"
      {...props}
    >
      <circle cx={12} cy={12} r={10} />
    </svg>
  );
}

export default SvgCircle;
