import { IEvent } from "@common/types";

export type TEventModalProps = {};

export type TEventModal = {
  markerNode: HTMLDivElement | null;
  animateFromNode: HTMLDivElement | null;
} & Partial<IEvent>;
