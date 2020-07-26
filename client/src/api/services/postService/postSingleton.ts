import { postService } from "@api/services/postService";

const postServiceSingleton = new postService();
Object.freeze(postServiceSingleton);

export {postServiceSingleton};
