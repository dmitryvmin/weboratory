import { ReactNode, SyntheticEvent } from "react";

export type TButton = {
  children: ReactNode;
  onClick(ev: SyntheticEvent<HTMLDivElement>): void;
  color?: "primary" | "secondary";
  disabled?: boolean;
  confirm?: boolean;
  className?: string;
}
