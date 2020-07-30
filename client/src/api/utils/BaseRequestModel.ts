// Libs
import { Observable } from "rxjs";

// App
import { getEnv } from "@configs/env";
import { log } from "@utils/Logger";

// Types
import { _Headers, Body, Method, Props } from "./types";

/**
 * REST Observable
 */
class BaseRequestModel<T> implements Props<T> {
  url: string;
  method: Method;
  headers: _Headers;
  body: Body;

  constructor(
    url: string,
    method?: Method,
    headers?: _Headers,
    body?: Body,
  ) {
    this.url = `${getEnv("API_SERVER")}/${url}`;
    this.method = method || "GET";
    this.headers = headers || {};
    this.body = body;
  }

  request(): Observable<any> {
    return new Observable(observer => {
      fetch(
        this.url,
        {
          method: this.method,
          headers: this.headers,
          body: this.body,
        })
        .then((r: Response) => {
          // log(`Response completed with status code ${r.status}.`);
          if (r.status === 200) {
            return r.json();
          }
          if (r.status === 500) {
            return null;
          }
          else {
            return r;
          }
        })
        .then((data) => {
          // log(`Passing response data to the observer. Data:`, data);
          observer.next(data);
          // observer.complete();
        })
        .catch((e: any) => {
          observer.error(e);
        });
      return () => {
        // clean up on unsubscribe
      };
    });
  }
}

export { BaseRequestModel };
