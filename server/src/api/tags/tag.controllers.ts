"use strict";

// Libs
import {Context} from "koa";
import * as HttpStatus from "http-status";

// Schema
import Tags from "../../models/objection/Tags";
import { deleteTagById, deleteTagByTitle, getAllTags } from "./tag.services";
import { removeTagFromTagMaps } from "../tagmap/tagmap.services";

/**
 * Retrieve all Tags
 */
async function getAll(ctx: Context, next: () => Promise<any>) {

  const tags = await getAllTags();

  if (tags) {
    ctx.status = HttpStatus.OK;
    ctx.body = tags;
  }
  else {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = "Errored fetching all the tags.";
  }
}

/**
 * Add a Tag
 */
async function addOne(ctx: Context, next: () => Promise<any>) {

  // Get body variables from the request
  const {
    title,
  } = ctx.request.body;

  // Check that we have the title
  if (!title) {
    ctx.status = HttpStatus.NOT_ACCEPTABLE;
    ctx.body = "Tag title is missing.";
    return;
  }

  // Add the Tag object to the the Tags table
  try {
    const tag = await Tags.query().insert({
      title,
    });
    ctx.status = HttpStatus.CREATED;
    ctx.body = tag;
  }
  catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = "Error creating the new tag";
  }
}

/**
 * Delete a Tag
 */
async function deleteOne(ctx: Context, next: () => Promise<any>) {

  const uri = ctx.params.id;

  if (!uri) {
    ctx.status = HttpStatus.NO_CONTENT;
    return;
  }

  const tag = decodeURI(uri);

  try {
    await deleteTagByTitle(tag);

    ctx.body = `Deleted tag: ${tag} from the Tags table.`;
    ctx.status = HttpStatus.NO_CONTENT;
  }
  catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = `Error deleting the tag ${tag} from the Tags table: ${err}.`;
  }
}

/**
 * Deletes tag rows by tagId from Tags and TagMap tables
 *
 * @return new Tags[]
 */
async function removeTagFromAll(ctx: Context, next: () => Promise<any>) {

  const { tagId } = ctx.params;

  if (!tagId) {
    ctx.status = HttpStatus.NO_CONTENT;
    ctx.body = `Can't remove tag, no tagId ${tagId}.`;
    return;
  }

  // Remove Tag from TagMap Table
  try {
    await removeTagFromTagMaps(tagId);
  }
  catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = `Error deleting tagId ${tagId} from TagMap table: ${err}.`;
    return;
  }

  // Remove Tag From Tag Table
  try {
    await deleteTagById(tagId);
  }
  catch (err) {
    ctx.status = HttpStatus.NO_CONTENT;
    ctx.body = `Couldn't remove tagId ${tagId} from the TagMap Table.`;
  }

  // Return all active Tags
  const tags = await getAllTags();

  ctx.status = HttpStatus.OK;
  ctx.body = tags;
}

export {
  getAll,
  addOne,
  deleteOne,
  removeTagFromAll,
}
