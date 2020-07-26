// Libs
import { Observable, Subject } from "rxjs";

// API
import { BaseRequestModel } from "@api/utils/BaseRequestModel";
import { deleteTagFromAllURI } from "@api/routes/tags";

// Types
import { Body } from "../../utils/types";
import { TTag, TPost } from "@common/types";

/**
 * TagService
 */
class tagService {
  public tags$: Subject<any>;
  private tagsBaseUrl: string;

  constructor() {
    this.tags$ = new Subject<TPost>();
    this.tagsBaseUrl = "api/v1/tags";
  }

  getTagsObservable() {
    return this.tags$.asObservable();
  }

  // Update tags$ with all the system tags
  getAllTagIds() {
    const headers = {
      "Access-Control-Allow-Origin": "*",
    };

    new BaseRequestModel<TTag>(this.tagsBaseUrl, "GET", headers)
      .request()
      .subscribe(this.tags$);

    // return this.tags$.asObservable(); // Observable<TTag[]>
  }

  deleteTagFromAll(tagId: string) {

    const reqURI = deleteTagFromAllURI(tagId);
    const headers = {
      "Content-Type": "application/json",
    };

    new BaseRequestModel(reqURI, "PUT", headers)
      .request()
      .subscribe(this.tags$);
  }

  // post request
  post(route: string, body: Body): Observable<TTag[]> {
    const headers = {
      // "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    const newBase = new BaseRequestModel<TTag>(route, "POST", headers, body);
    return newBase.request();
  }

  delete(route: string): Observable<TTag[]> {
    const headers = {
      "Content-Type": "application/json",
    }
    const newBase = new BaseRequestModel<TTag>(route, "DELETE", headers);
    return newBase.request();
  }

};

const tagsServiceSingleton = new tagService();
Object.freeze(tagsServiceSingleton);

export {tagService, tagsServiceSingleton};
