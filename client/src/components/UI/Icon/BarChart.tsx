import React from "react";

function SvgBarChart(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="bar-chart_svg__feather bar-chart_svg__feather-bar-chart"
      {...props}
    >
      <path d="M12 20V10M18 20V4M6 20v-4" />
    </svg>
  );
}

export default SvgBarChart;
