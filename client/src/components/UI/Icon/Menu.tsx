import React from "react";

function SvgMenu(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="menu_svg__feather menu_svg__feather-menu"
      {...props}
    >
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  );
}

export default SvgMenu;
