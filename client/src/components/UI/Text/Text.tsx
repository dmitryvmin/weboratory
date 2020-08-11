// Libs
import React, { FC, SyntheticEvent, useState } from "react";

// Styles
import classNames from "./styles.module.scss";

// Types
import { TextProps } from "@components/UI/Text/types";

const Text: FC<TextProps> = ({
  children,
  style = "p1",
  brightness,
}) => {

  const getStyles = () => {
    return ([
      classNames[style],
      (brightness === "dark") ?? classNames.colorDark,
      (brightness === "dark") ?? classNames.colorLight,
    ].join(" "));
  };

  return (
    <div className={getStyles()}>
      {children}
    </div>
  );
};

export { Text };
