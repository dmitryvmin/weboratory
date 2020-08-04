"use strict";

// Libs
import { Model } from "objection";

class Events extends Model {
  static tableName = "events";

  id: string;
  userId: string;
  associatedIds: string[];
  content: string;
  status: string;
  title: string;
  address: string;
  coordinates: string;
  visibility: string;
  time: string;
  createdAt: string;
  updatedAt: string;
}

export { Events };