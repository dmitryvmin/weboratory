// Libs
import { Observable, pipe, Subject } from "rxjs";

// API
import { BaseRequestModel } from "@api/utils/BaseRequestModel";
import { getEventsByUserId, updateEventContent } from "@api/routes/events";

// Utils
import { parseJSON } from "@utils/parseJSON";

// Types
import { IEvent } from "@common/types";
import { map } from "rxjs/operators";

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

  getEvents(userId: string) {
    const reqURI = getEventsByUserId(userId);
    new BaseRequestModel<any>(reqURI, "GET")
      .request()
      .subscribe((res) => {
        this.eventsState$.next(res);
      });
  }

  updateEvent(eventId: string, content: Partial<IEvent>) {
    const reqURI = updateEventContent(eventId);
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(content);

    new BaseRequestModel<any>(reqURI, "PUT", headers, body)
      .request()
      .subscribe(this.eventState$);
  }
}

export { eventsService };
