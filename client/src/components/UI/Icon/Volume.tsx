import React from "react";

function SvgVolume(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="volume_svg__feather volume_svg__feather-volume"
      {...props}
    >
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
    </svg>
  );
}

export default SvgVolume;
