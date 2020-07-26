import { TPost } from "@common/types";
import { editorService, postService, tagMapService } from "@api/services";

export type PostMenuProps = {
  post?: TPost;
  title?: string;
  tagMapSingleton: tagMapService;
  editorSingleton: editorService;
  handleSave: any;
  handleDelete?: any;
}
