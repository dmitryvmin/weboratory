// Model
import TagMap from "../../../models/objection/TagMap";

// Service
import { removeTagFromTagMapById } from "./removeTagFromTagMapById";

/**
 * Remove a tag from all tag-maps that contain it
 * Notes:
 * - https://coderwall.com/p/1b5eyq/index-for-uuid-array-data-type
 * @param tagId
 */
async function removeTagFromTagMaps(tagId: string) {
  try {
    await TagMap.query()
      .select("post_id")
      .select("tag_ids")
      .then(async (tagMaps) => {

        // Take each tagMap row and see if its tagIds array
        // contains the tagId we want to remove
        for (let i = 0; i < tagMaps.length; i++) {
          const {
            post_id,
            tag_ids,
          }: {post_id: string, tag_ids: string[]} = tagMaps[i];

          // If tagId is present, remove it and update the tagMap row
          if (tag_ids.includes(tagId)) {
            await removeTagFromTagMapById(post_id, tagId, tag_ids);
          }
        }

      });
    console.log`Removed tagId ${tagId} from the TagMap Table.`;
    return;
  }
  catch (err) {
    console.log(`Error removing tagId: ${tagId} from TagMap: ${err}.`);
    return;
  }
}

export {removeTagFromTagMaps};
