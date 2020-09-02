// Libs
import React, { FC, JSXElementConstructor, ReactComponentElement, ReactElement, ReactNode } from "react";

// Utils
import { cn } from "@utils/css/getClassName";

// Styles
import classNames from "./styles.module.scss";

// Types
import { TextProps } from "@components/UI/Text/types";

const Text: FC<TextProps> = ({
  children,
  style = "p1",
  brightness,
  className,
  el = "p",
}) => {

  const El: any = el as any;

  const getStyles = () => {
    return cn(
      classNames[style],
      (brightness === "dark") && classNames.colorDark,
      (brightness === "light") && classNames.colorLight,
    );
  };

  return (
    <El
      {...className && {className}}
      className={getStyles()}
    >
      {children}
    </El>
  );
};

export { Text };
