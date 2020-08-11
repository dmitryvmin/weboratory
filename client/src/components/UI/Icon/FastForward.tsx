import React from "react";

function SvgFastForward(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="fast-forward_svg__feather fast-forward_svg__feather-fast-forward"
      {...props}
    >
      <path d="M13 19l9-7-9-7v14zM2 19l9-7-9-7v14z" />
    </svg>
  );
}

export default SvgFastForward;
