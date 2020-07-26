import { TPost } from "@common/types";
import { tagMapService } from "@api/services";

export type PostTagsProps = {
  post?: TPost;
  tagMapSingleton: tagMapService;
};
