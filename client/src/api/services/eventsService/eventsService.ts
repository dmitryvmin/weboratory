// Libs
import { Observable, pipe, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { log } from "@dmitrymin/fe-log";

// API
import { BaseRequestModel } from "@api/utils/BaseRequestModel";
import { getCreateEventURI, getEventsByUserId, getEventsByVisibility, updateEventContent } from "@api/routes/events";

// Types
import { IEvent } from "@common/types";

function createEventPayload(body) {
  return JSON.stringify({
    address: body.address,
    content: body.content,
    coordinates: body.coordinates,
    time: body.time,
    title: body.title,
  })
}

/**
 * Events Service Class
 */
class eventsService {
  public eventsState$: Subject<IEvent[]>;
  public eventState$: Subject<IEvent>;

  constructor() {
    this.eventsState$ = new Subject();
    this.eventState$ = new Subject();
  }

  onEvents(): Observable<IEvent[]> {
    return this.eventsState$.asObservable();
  }

  onEvent(): Observable<IEvent> {
    return this.eventState$.asObservable();
  }

  setEvents(nextState: IEvent[]): void {
    this.eventsState$.next(nextState);
  }

  setEvent(nextState: IEvent): void {
    this.eventState$.next(nextState);
  }

  createEvent(content: any) {
    const reqURI = getCreateEventURI();
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    const body = createEventPayload(content);
    new BaseRequestModel<any>(reqURI, "POST", headers, body)
      .request()
      .subscribe(this.eventState$);
  }

  getUserEvents(userId: string) {
    const reqURI = getEventsByUserId(userId);
    new BaseRequestModel<any>(reqURI, "GET")
      .request()
      .subscribe(this.eventsState$);
  }

  getEventsByVis(visibility: string) {
    const reqURI = getEventsByVisibility(visibility);
    const headers = {
      // "Access-Control-Allow-Origin": "*",
    };
    new BaseRequestModel<any>(reqURI, "GET", headers)
      .request()
      .subscribe(this.eventsState$);
  }

  updateEvent(eventId: string, content: Partial<IEvent>) {
    const reqURI = updateEventContent(eventId);
    const headers = {
      "Content-Type": "application/json",
    };
    log("eventsService updating event...");
    const body = createEventPayload(content);
    new BaseRequestModel<any>(reqURI, "PUT", headers, body)
      .request()
      .subscribe(this.eventState$);
  }
}

export { eventsService };
