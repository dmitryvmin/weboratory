import React from "react";

function SvgTruck(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="truck_svg__feather truck_svg__feather-truck"
      {...props}
    >
      <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" />
      <circle cx={5.5} cy={18.5} r={2.5} />
      <circle cx={18.5} cy={18.5} r={2.5} />
    </svg>
  );
}

export default SvgTruck;
