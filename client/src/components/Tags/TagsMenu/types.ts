import { TPost } from "@common/types";
import { tagMapService } from "@api/services";

export type TagMenuProps = {
  post?: TPost;
  tagMapSingleton: tagMapService;
}