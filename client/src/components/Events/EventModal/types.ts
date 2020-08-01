import { IEvent } from "@common/types";
import { ActiveEvent } from "@stores/EventStore/types";

export type TEventModalProps = {
  activeEvent?: ActiveEvent;
};

export type TEventModal = {
  markerNode: HTMLDivElement | undefined;
} & Partial<IEvent>;
