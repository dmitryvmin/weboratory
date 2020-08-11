import React from "react";

function SvgPauseCircle(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pause-circle_svg__feather pause-circle_svg__feather-pause-circle"
      {...props}
    >
      <circle cx={12} cy={12} r={10} />
      <path d="M10 15V9M14 15V9" />
    </svg>
  );
}

export default SvgPauseCircle;
