import { SyntheticEvent } from "react";

export type TSearchInput = {
  address: string;
  handleSearch(ev: SyntheticEvent<HTMLInputElement>): void;
  isOpen?: boolean;
  setIsOpen(isOpen: boolean): void;
}
