"use strict";

// Libs
import { Model } from "objection";

class Events extends Model {
  static tableName = "events";

  id: string;
  user_id: string;
  associated_ids: string[];
  content: string;
  status: string;
  title: string;
  location: string;
  coordinates: string;
  visibility: string;
  time: string;
  created_at: string;
  updated_at: string;
}

export { Events };