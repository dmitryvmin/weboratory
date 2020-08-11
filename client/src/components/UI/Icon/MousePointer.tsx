import React from "react";

function SvgMousePointer(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mouse-pointer_svg__feather mouse-pointer_svg__feather-mouse-pointer"
      {...props}
    >
      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3zM13 13l6 6" />
    </svg>
  );
}

export default SvgMousePointer;
