// Libs
import { Observable, pipe, Subject } from "rxjs";

// API
import { BaseRequestModel } from "@api/utils/BaseRequestModel";
import { getEventsByUserId } from "@api/routes/events";

// Utils
import { parseJSON } from "@utils/parseJSON";

// Types
import { IEvent } from "@common/types";
import { map } from "rxjs/operators";

class eventsService {
  public eventsState$: Subject<IEvent[]>;

  constructor() {
    this.eventsState$ = new Subject();
  }

  onEvents(): Observable<IEvent[]> {
    return this.eventsState$.asObservable();
  }

  setEvents(nextState: IEvent[]): void {
    this.eventsState$.next(nextState);
  }

  getEvents(userId: string) {
    const reqURI = getEventsByUserId(userId);
    new BaseRequestModel<any>(reqURI, "GET")
      .request()
      .subscribe(this.eventsState$);
  }
}

export { eventsService };
