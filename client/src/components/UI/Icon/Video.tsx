import React from "react";

function SvgVideo(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="video_svg__feather video_svg__feather-video"
      {...props}
    >
      <path d="M23 7l-7 5 7 5V7z" />
      <rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
    </svg>
  );
}

export default SvgVideo;
