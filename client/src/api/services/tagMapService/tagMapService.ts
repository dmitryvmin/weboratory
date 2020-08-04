// Libs
import { Observable, Subject } from "rxjs";

// API
import { addTagByTagIdURI, addTagByTagTitleURI, deleteTagFromPostURI, getTagMap } from "@api/routes/tagmap";

// Utils
import { BaseRequestModel } from "@api/utils/BaseRequestModel";

// Types
import { TTag } from "@common/types";
import { Body } from "../../utils/types";
import { map, take } from "rxjs/operators";

/**
 * TagMapService
 */
class tagMapService {
  public tagMap$: Subject<any>;
  private tagMapBaseUrl: string;

  constructor() {
    this.tagMap$ = new Subject<TTag[]>();
    this.tagMapBaseUrl = "api/v1/tagmap";
  }

  // setTagMap: tagMap => {
  //   $tagMap.next({ tagMap });
  // }

  getTagMapObservable() {
    return this.tagMap$.asObservable();
  }

  // get request
  getTagMap(postId): Observable<TTag[]> | undefined {

    if (!postId) {
      return;
    }

    const reqURI = getTagMap(postId);
    const headers = {
      "Access-Control-Allow-Origin": "*",
    };

    new BaseRequestModel(reqURI, "GET", headers)
      .request()
      .subscribe(this.tagMap$);
  }

  // post request
  post(route: string, body?: Body) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      // "Content-Type": "application/json",
    };
    new BaseRequestModel(route, "POST", headers, body)
      .request()
      .subscribe(this.tagMap$);
  }

  // delete request
  deleteTagFromPost(postId: string, tagId: string) {

    const reqURI = deleteTagFromPostURI(postId, tagId);

    const headers = {
      "Content-Type": "application/json",
    };

    new BaseRequestModel(reqURI, "DELETE", headers)
      .request()
      // .pipe(
      //   take(1),
      //   map((res) => {
      //     return res.tag_ids;
      //   }))
      // .catchError(err => throwError(err)),
      .subscribe(this.tagMap$);
  }

  // post requests
  addTagByTagId(postId, tagId) {
    const reqURI = addTagByTagIdURI(postId, tagId);
    const headers = {
      "Access-Control-Allow-Origin": "*",
    };
    // const body = JSON.stringify({
    //   post_id: postId,
    //   tag_id: tagId,
    // });
    new BaseRequestModel<any>(reqURI, "POST", headers)
      .request()
      .subscribe(this.tagMap$);
  }

  addTagByTagTitle(postId, tagTitle) {
    const reqURI = addTagByTagTitleURI(postId, tagTitle);
    const headers = {
      "Access-Control-Allow-Origin": "*",
    };
    new BaseRequestModel<any>(reqURI, "POST", headers)
      .request()
      .subscribe(this.tagMap$);
  }
}

export { tagMapService };
