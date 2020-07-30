import { IEvent } from "@common/types";
import { ActiveEvent } from "@stores/EventStore/types";

export type TMapMarkerProps = {
  event: IEvent | ActiveEvent;
};