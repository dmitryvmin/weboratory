import { ReactNode } from "react";

type TextStyle =
  | "util1"
  | "header1"
  | "p1"
  | "p2"
  | "p3"
  | "label1"
  | "label2"
  | "label3"
  ;

export type TextProps = {
  children: ReactNode;
  style?: TextStyle;
  brightness?: "light" | "dark";
  className?: string;
}
