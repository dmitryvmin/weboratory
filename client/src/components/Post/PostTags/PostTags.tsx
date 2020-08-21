// Libs
import React, { FC, useEffect, useRef } from "react";

// API
import { TagMapService } from "@api/services/TagMapService/TagMapService";

// Components
import { Tag } from "@components/Tags/Tag";
import { Close } from "@components/UI/Icon";

// Styles
import styles from "./styles.module.scss";

// Types
import { PostTagsProps } from "@components/Post/PostTags/types";
import { TTag } from "@common/types";
import { useObservable } from "@utils/hooks/useObservable";

/**
 * PostTags
 */
const PostTags: FC<PostTagsProps> = ({ post, tagMapSingleton }) => {

  const tagMap$ = useObservable<TTag[]>(tagMapSingleton.getTagMapObservable());

  useEffect(() => {
    if (!post?.id) {
      return;
    }
    tagMapSingleton.getTagMap(post.id);
  }, []);

  /**
   * Handlers
   */
  function handleRemovePostTag(tagId: string) {
    return function() {
      // if (!isActive) {
      //   return;
      // }
      tagMapSingleton.deleteTagFromPost(post!.id, tagId);
    };
  }

  return (
    <div className={styles.container}>
      {tagMap$?.map(({ title, id }: any, idx) => {
        return (
          <Tag key={`tag-${title}-${idx}`} title={title}>
            <div onClick={handleRemovePostTag(id)} className={styles.deleteTag}>
              <Close/>
            </div>
          </Tag>
        );
      })}
    </div>
  );
};

export {PostTags};
