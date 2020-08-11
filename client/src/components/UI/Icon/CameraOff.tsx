import React from "react";

function SvgCameraOff(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="camera-off_svg__feather camera-off_svg__feather-camera-off"
      {...props}
    >
      <path d="M1 1l22 22M21 21H3a2 2 0 01-2-2V8a2 2 0 012-2h3m3-3h6l2 3h4a2 2 0 012 2v9.34m-7.72-2.06a4 4 0 11-5.56-5.56" />
    </svg>
  );
}

export default SvgCameraOff;
