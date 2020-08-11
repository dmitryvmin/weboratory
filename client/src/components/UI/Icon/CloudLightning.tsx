import React from "react";

function SvgCloudLightning(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="cloud-lightning_svg__feather cloud-lightning_svg__feather-cloud-lightning"
      {...props}
    >
      <path d="M19 16.9A5 5 0 0018 7h-1.26a8 8 0 10-11.62 9" />
      <path d="M13 11l-4 6h6l-4 6" />
    </svg>
  );
}

export default SvgCloudLightning;
