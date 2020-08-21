import { TPost } from "@common/types";
import { TagMapService } from "@api/services";

export type PostTagsProps = {
  post?: TPost;
  tagMapSingleton: TagMapService;
};
