import React from "react";

function SvgFeather(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather_svg__feather feather_svg__feather-feather"
      {...props}
    >
      <path d="M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5zM16 8L2 22M17.5 15H9" />
    </svg>
  );
}

export default SvgFeather;
