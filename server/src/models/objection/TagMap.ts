"use strict";

// Libs
import { Model } from "objection";

// Models
import Posts from "./Posts";
import Tags from "./Tags";

class TagMap extends Model {
  static tableName = "tagmap";

  id: string;
  tag_ids: string[];
  post_id: string;

  static get relationMappings() {
    return {
      posts: {
        relation: Model.BelongsToOneRelation,
        modelClass: Posts,
        join: {
          from: "tagmap.post_id",
          to: "posts.id",
        },
      },
      tags: {
        relation: Model.BelongsToOneRelation,
        modelClass: Tags,
        join: {
          from: "tagmap.tags_id",
          to: "tags.id",
        },
      },
    };
  }
}

export default TagMap;
