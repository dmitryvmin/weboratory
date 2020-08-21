import { PostService } from "@api/services/PostService/PostService";

const postServiceSingleton = new PostService();
Object.freeze(postServiceSingleton);

export {postServiceSingleton};
