import { ReactNode } from "react";

type TextStyle =
  | "util1"
  | "header1"
  | "p1"
  | "label1"
  | "label2"
  ;

export type TextProps = {
  children: ReactNode;
  style?: TextStyle;
  brightness?: "light" | "dark";
}
