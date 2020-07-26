// Schema
import Tags from "../../db/models/objection/Tags";
import * as HttpStatus from "http-status";

/**
 * Retrieves tag row given the title
 */
async function getTagByTagTitle(title) {
  try {
    const tag = await Tags.query()
      .where({
        title,
      });
    return tag[0];
  }
  catch (err) {
    console.log(`Couldn't find an existing tag with the title: ${title}`);
    return;
  }
}

/**
 * Retrieves tag row given the title
 */
async function getTagByTagId(id) {
  try {
    const tag = await Tags.query()
      .where({
        id,
      });
    return tag[0];
  }
  catch (err) {
    console.log(`Couldn't find an existing tag with the title: ${id}`);
    return;
  }
}

/**
 * Deletes tag from the Tag Table by tagTitle
 */
async function deleteTagByTitle(tagTitle) {
  try {
    await Tags.query()
      .where("title", tagTitle)
      .del();
  }
  catch (err) {
    console.log(`Couldn't delete tag by tagTitle: ${tagTitle}`);
  }
}

/**
 * Deletes tag from the Tag Table by tagId
 */
async function deleteTagById(tagId) {
  try {
    const tags = await Tags.query()
      .where("id", tagId)
      .del()
      .returning("*");

    console.log('Removed tag:', tags[0]);
  }
  catch (err) {
    console.log(`Couldn't delete tag by tagId: ${tagId}`);
  }
}

/**
 * Creates a new tag row using provided title
 */
async function createNewTag({ tagTitle, tagId}: { tagTitle?: string, tagId?: string }) {

  if (!tagTitle && !tagId) {
    console.log("Need tagTitle or tagId to create a new tag.");
    return;
  }

  const newTag = tagTitle ? { title: tagTitle } : { id: tagId };

  try {
    const tag = await Tags
      .query()
      .insert(newTag);
    console.log("Created new tag:", tag);

    return tag;
  }
  catch(err) {
    console.log("Errored creating new tag.");
  }
}

/**
 * Returns Tag objects for an array of tagIds
 */
async function getTagsFromTagsIds(tagIds: string[]) {
  const tags = await Tags
    .query()
    .findByIds(tagIds);
  return tags;
}

/**
 * Saves new Tags to the Tags table, and return ids for all the provided tags
 * @param tagTitle[]
 *
 * @return tagId[]
 */
async function addTagsByTagTitle(tags) {
  // Return if tags array is empty
  if (!tags || !tags.length) {
    return;
  }

  // If the Post was tagged, store tag ids in the tags_ids array
  // to be saved to the TagMap table
  const tagsIds = [];

  // If a Tags table update fails, catch the error
  try {
    // Loop through the tags
    for (let idx = 0; idx < tags.length; idx++) {
      const tagTitle = tags[idx];

      // We have the user submitted Tag
      // Check if a tag with this title already exists
      let { id } = await getTagByTagTitle(tagTitle);

      // If this tag already exists, store its id in the tags_ids array
      if (id) {
        tagsIds.push(id);
      }
      // Otherwise, this Tag needs to be saved to our Tags table first
      else {
        const newTag = await createNewTag({ tagTitle });
        // And once it's been saved and has an id, store in the tags_ids array
        tagsIds.push(newTag.id);
      }
    }
  }
  catch (err) {
    console.log(`Error updating Tags table tags by title: ${err}`);
  }

  return tagsIds;
};

/**
 * Retrieves all the tags from the Tags table
 * @return tagId[]
 */
async function getAllTags() {
  try {
    const tags = await Tags
      .query()
      .orderBy("title");

    console.log("Retrieved all tags:", tags);
    return tags;
  }
  catch(err) {
    console.log("Errored retrieving all tags", err);
  }
}

export {
  getTagByTagTitle,
  getTagByTagId,
  createNewTag,
  addTagsByTagTitle,
  getTagsFromTagsIds,
  deleteTagByTitle,
  deleteTagById,
  getAllTags,
};