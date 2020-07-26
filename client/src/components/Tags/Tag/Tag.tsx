// Libs
import React, { CSSProperties, FC, ReactElement } from "react";

// Styles
import styles from "./styles.module.scss";

// Types
interface TagProps {
  title: string;
  actionable?: boolean;
  children?: ReactElement;
}

const Tag: FC<TagProps> = ({ title , actionable, children}) => {

  const pillStyle: CSSProperties = ({
    ...(actionable && {cursor: "pointer"}),
  });

  return (
    <div
      key={`pill-${title}`}
      style={pillStyle}
      className={styles.tagPill}
    >
      <p>{title}</p>
      {children}
    </div>
  );
};

export {Tag};
