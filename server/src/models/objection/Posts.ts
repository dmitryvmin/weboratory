"use strict";

// Libs
import { Model } from "objection";

// Models
import TagMap from "./TagMap";


class Posts extends Model {
  static tableName = "posts";

  id: string;
  title: string;
  content: string;
  draft: boolean;
  created_at: string;
  updated_at: string;

  static get relationMappings() {
    return {
      tagmap: {
        relation: Model.BelongsToOneRelation,
        modelClass: TagMap,
        join: {
          from: "posts.id",
          to: "tagmap.post_id",
        },
      },
    };
  }
}

export default Posts;