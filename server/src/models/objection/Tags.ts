"use strict";

// Libs
import { Model } from "objection";

// Models
import TagMap from "./TagMap";

class Tags extends Model {
  static tableName = "tags";

  id: string;
  title: string;

  static get relationMappings() {
    return {
      tagmap: {
        relation: Model.HasManyRelation,
        modelClass: TagMap,
        join: {
          from: "tags.id",
          to: "tagmap.tags_id",
        },
      },
    };
  }
}

export default Tags;