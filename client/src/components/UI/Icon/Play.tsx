import React from "react";

function SvgPlay(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="play_svg__feather play_svg__feather-play"
      {...props}
    >
      <path d="M5 3l14 9-14 9V3z" />
    </svg>
  );
}

export default SvgPlay;
