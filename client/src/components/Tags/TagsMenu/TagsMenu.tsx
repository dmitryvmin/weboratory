// Libs
import React, { FC, SyntheticEvent, useRef, useEffect, useState, memo } from "react";

// Hooks
import { useEventListener } from "@utils/hooks/useEventListener";
import { useObservable } from "@utils/hooks/useObservable";

// API
import { tagsServiceSingleton } from "@api/services/tagService/tagService";

// Components
import { Tag } from "@components/Tags/Tag";
import { Button } from "@components/UI/Button";

// Style
import styles from "./styles.module.scss";

// Types
import { TagMenuProps } from "@components/Tags/TagsMenu/types";
import { TTag } from "@common/types";

/**
 * TagMenu
 */
const TagsMenu: FC<TagMenuProps> = memo(({ post, tagMapSingleton }) => {

    /**
     * Hooks
     */
      // Visibility state of the tags list menu
    const [menuVisible, setMenuVisible] = useState<boolean>(false);

    // All the tags that exist in the application
    const tags$ = useObservable<TTag[]>(tagsServiceSingleton.getTagsObservable());

    // Records new tag input
    const [tagTitle, setTagTitle] = useState<string>("");

    // Menu panel ref
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicked outside
    useEventListener(document, "click", handleOutsideClick);

    /**
     * Effects
     */
    useEffect(() => {
      tagsServiceSingleton.getAllTagIds();
    }, []);

    /**
     * Handlers
     */
    function handleAddTagToPost(tagId: string) {
      return function() {
        if (!post?.id) {
          return;
        }
        tagMapSingleton.addTagByTagId(post.id, tagId);
      };
    }

    function handleAddNewTagToPost() {
      if (!post?.id) {
        return;
      }
      tagMapSingleton.addTagByTagTitle(post.id, tagTitle);
    }

    function handleDeleteTagFromAll(tagId: string) {
      return function() {
        if (!tagId) {
          console.log("Couldn't delete tag from all, no tagId:", tagId);
        }
        tagsServiceSingleton.deleteTagFromAll(tagId);
      };
    }

    function toggleMenu() {
      setMenuVisible((state) => !state);
    }

    function handleInput(ev: SyntheticEvent<HTMLInputElement>) {
      setTagTitle(ev.currentTarget.value);
    }

    function handleOutsideClick(ev: any) {
      if (!menuVisible || !menuRef.current) {
        return;
      }
      if (
        menuRef.current !== ev.target &&
        menuRef.current.contains(ev.target)
      ) {
        return;
      }
      setMenuVisible(false);
    }

    /**
     * Render functions
     */
    function renderAddNewTag() {
      return (
        <div className={styles.newTagInput}>
          <input value={tagTitle} onChange={handleInput} type="text"/>
          <Button onClick={handleAddNewTagToPost}>Add New Tag</Button>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <Button onClick={toggleMenu}>Tag Post</Button>
        {menuVisible &&
        <div ref={menuRef} className={styles.menuPanel}>
          {
            tags$ && tags$?.map(({ id, title }: any, idx) => {
              return (
                <Tag key={`option-${title}-${idx}`} title={title ?? "null"} actionable>
                  <>
                    <Button onClick={handleDeleteTagFromAll(id)}>Delete</Button>
                    <Button onClick={handleAddTagToPost(id)}>Add</Button>
                  </>
                </Tag>
              );
            })
          }
          {renderAddNewTag()}
        </div>}
      </div>
    );
  },
);

export { TagsMenu };
