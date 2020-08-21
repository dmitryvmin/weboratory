// Libs
import React, { FC } from "react";

// Styles
import classNames from "./styles.module.scss";

// Types
import { TextProps } from "@components/UI/Text/types";

const Text: FC<TextProps> = ({
  children,
  style = "p1",
  brightness,
  className,
}) => {

  const getStyles = () => {
    return ([
      classNames[style],
      (brightness === "dark") ?? classNames.colorDark,
      (brightness === "dark") ?? classNames.colorLight,
    ].join(" "));
  };

  return (
    <div
      {...className && {className}}
      className={getStyles()}
    >
      {children}
    </div>
  );
};

export { Text };
