import React from "react";

function SvgCloudRain(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="cloud-rain_svg__feather cloud-rain_svg__feather-cloud-rain"
      {...props}
    >
      <path d="M16 13v8M8 13v8M12 15v8M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25" />
    </svg>
  );
}

export default SvgCloudRain;
