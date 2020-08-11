import React from "react";

function SvgBriefcase(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="briefcase_svg__feather briefcase_svg__feather-briefcase"
      {...props}
    >
      <rect x={2} y={7} width={20} height={14} rx={2} ry={2} />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  );
}

export default SvgBriefcase;
