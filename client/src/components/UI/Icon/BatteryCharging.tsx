import React from "react";

function SvgBatteryCharging(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="battery-charging_svg__feather battery-charging_svg__feather-battery-charging"
      {...props}
    >
      <path d="M5 18H3a2 2 0 01-2-2V8a2 2 0 012-2h3.19M15 6h2a2 2 0 012 2v8a2 2 0 01-2 2h-3.19M23 13v-2M11 6l-4 6h6l-4 6" />
    </svg>
  );
}

export default SvgBatteryCharging;
