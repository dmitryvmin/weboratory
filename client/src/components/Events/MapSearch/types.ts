import { SyntheticEvent } from "react";

export type TSearchInput = {
  address: string;
  handleAddressSearch(ev: SyntheticEvent<HTMLInputElement>): void;
  isOpen?: boolean;
  setIsOpen(isOpen: boolean): void;
}
