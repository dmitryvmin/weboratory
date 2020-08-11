import React from "react";

function SvgGitCommit(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="git-commit_svg__feather git-commit_svg__feather-git-commit"
      {...props}
    >
      <circle cx={12} cy={12} r={4} />
      <path d="M1.05 12H7M17.01 12h5.95" />
    </svg>
  );
}

export default SvgGitCommit;
