import React from "react";

function SvgBarChart2(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="bar-chart-2_svg__feather bar-chart-2_svg__feather-bar-chart-2"
      {...props}
    >
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </svg>
  );
}

export default SvgBarChart2;
