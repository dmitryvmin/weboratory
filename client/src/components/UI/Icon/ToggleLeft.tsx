import React from "react";

function SvgToggleLeft(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="toggle-left_svg__feather toggle-left_svg__feather-toggle-left"
      {...props}
    >
      <rect x={1} y={5} width={22} height={14} rx={7} ry={7} />
      <circle cx={8} cy={12} r={3} />
    </svg>
  );
}

export default SvgToggleLeft;
