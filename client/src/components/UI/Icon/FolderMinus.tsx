import React from "react";

function SvgFolderMinus(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="folder-minus_svg__feather folder-minus_svg__feather-folder-minus"
      {...props}
    >
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2zM9 14h6" />
    </svg>
  );
}

export default SvgFolderMinus;
