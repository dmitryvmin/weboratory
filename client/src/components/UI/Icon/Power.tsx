import React from "react";

function SvgPower(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="power_svg__feather power_svg__feather-power"
      {...props}
    >
      <path d="M18.36 6.64a9 9 0 11-12.73 0M12 2v10" />
    </svg>
  );
}

export default SvgPower;
