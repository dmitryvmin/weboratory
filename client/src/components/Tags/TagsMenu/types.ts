import { TPost } from "@common/types";
import { TagMapService } from "@api/services";

export type TagMenuProps = {
  post?: TPost;
  tagMapSingleton: TagMapService;
}