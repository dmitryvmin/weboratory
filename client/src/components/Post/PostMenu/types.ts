import { TPost } from "@common/types";
import { EditorService, PostService, TagMapService } from "@api/services";

export type PostMenuProps = {
  post?: TPost;
  title?: string;
  tagMapSingleton: TagMapService;
  editorSingleton: EditorService;
  handleSave: any;
  handleDelete?: any;
}
