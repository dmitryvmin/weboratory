import React from "react";

function SvgAlertCircle(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="alert-circle_svg__feather alert-circle_svg__feather-alert-circle"
      {...props}
    >
      <circle cx={12} cy={12} r={10} />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

export default SvgAlertCircle;
