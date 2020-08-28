import { IEvent } from "@common/types";

export type EventStateType = {
  event: IEvent | undefined;
  eventModal: EventModalType | undefined;
  isEventModalOpen: boolean;
};

export type EventModalType = {
  markerNode: HTMLDivElement | undefined;
};

export type EventPropsType = Partial<IEvent>;
