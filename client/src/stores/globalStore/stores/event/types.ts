import { IEvent } from "@common/types";

export type EventStateType = {
  event: IEvent | undefined;
  eventModal: EventModalType | undefined;
  eventModalMode: EventModalModeType;
};

export type EventModalModeType = "OPEN" | "CLOSED";

export type EventModalType = {
  markerNode: HTMLDivElement | undefined;
};

export type EventPropsType = Partial<IEvent>;
