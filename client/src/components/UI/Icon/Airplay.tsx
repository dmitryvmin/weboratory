import React from "react";

function SvgAirplay(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="airplay_svg__feather airplay_svg__feather-airplay"
      {...props}
    >
      <path d="M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1" />
      <path d="M12 15l5 6H7l5-6z" />
    </svg>
  );
}

export default SvgAirplay;
