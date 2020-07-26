// Libs
import { Observable, BehaviorSubject, pipe, Subject } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";

// API
import { BaseRequestModel } from "@api/utils/BaseRequestModel";
import { addPostURI, deletePost, getPostsURI, getPostURI, getTagPostURI, updatePostURI } from "@api/routes/posts";
import { tagService } from "@api/services";
import { tagsServiceSingleton } from "@api/services/tagService/tagService";

// Types
import { TTag, TPost } from "@common/types";
import { IPostService } from "@api/services/postService/types";

const PostState = {
  "LIVE": "LIVE",
  "DRAFT": "DRAFT",
  "SAVING": "SAVING",
};

class postService {
  private activePost$: Subject<TPost>;
  private posts$: Subject<TPost[]>;

  constructor() {
    this.activePost$ = new Subject<TPost>();
    this.posts$ = new Subject<TPost[]>();
  }

  onPosts(): Observable<any> {
    return this.posts$.asObservable();
  }

  setPosts(nextState): void {
    this.activePost$.next(nextState);
  }

  getPost(postTitle: string) {
    if (postTitle === null) {
      console.log(`postService getPost title value is null: ${postTitle}.`);
      return;
    }

    const headers = {
      // "Access-Control-Allow-Origin": "*",
      // "Content-Type": "application/json",
    };

    const reqURI = getPostURI(postTitle);

    new BaseRequestModel<any>(reqURI, "GET", headers)
      .request()
      .pipe(
        take(1),
        map((res) => {
          return res;
        }))
      .subscribe(this.activePost$);
  }

  getAllPosts() {
    const reqURI = getPostsURI();
    new BaseRequestModel<any>(reqURI, "GET")
      .request()
      .subscribe(this.posts$);
  }

  savePost(postId, postTitle, postContent) {
    const reqURI = updatePostURI(postId);
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      id: postId,
      ...postTitle && { title: postTitle },
      ...postContent && { content: postContent },
    });

    new BaseRequestModel<any>(reqURI, "PUT", headers, body)
      .request()
      .subscribe(this.activePost$);
  }

  addPost(title: string, content: string) {
    const reqURI = addPostURI();
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      ...title && { title },
      ...content && { content },
    });

    new BaseRequestModel<any>(reqURI, "POST", headers, body)
      .request()
      .subscribe(this.activePost$);
  }

  deletePost(postId) {
    const reqURI = deletePost(postId);
    const request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    // try {
    //   const response = await fetch(url, request);
    //   console.log(`Deleted post: ${postId}: ${response}.`);
    // }
    // catch (err) {
    //   console.log(`Failed deleting post ${postId}.`);
    // }
  }
}

export { postService };
