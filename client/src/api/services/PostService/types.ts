import { TTag } from "@common/types";

export interface IPostService {
  editState: boolean;
  postTags: TTag[];
  postContent: string;
}
