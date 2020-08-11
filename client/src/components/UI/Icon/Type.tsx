import React from "react";

function SvgType(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="type_svg__feather type_svg__feather-type"
      {...props}
    >
      <path d="M4 7V4h16v3M9 20h6M12 4v16" />
    </svg>
  );
}

export default SvgType;
