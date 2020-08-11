import React from "react";

function SvgPlayCircle(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="play-circle_svg__feather play-circle_svg__feather-play-circle"
      {...props}
    >
      <circle cx={12} cy={12} r={10} />
      <path d="M10 8l6 4-6 4V8z" />
    </svg>
  );
}

export default SvgPlayCircle;
