import { TLngLat } from "@components/Events/types";

export type TMapProps = {
  children: JSX.Element | JSX.Element[] | Array<JSX.Element>;
  center: TLngLat | undefined;
}
