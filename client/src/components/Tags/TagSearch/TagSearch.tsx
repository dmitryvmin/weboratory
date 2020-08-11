// Libs
import React, { FC, useEffect } from "react";

// Style
import classNames from "./styles.module.scss";

// Types
import { TagSearchProps } from "@components/Tags/TagSearch/types";

/**
 * TagSearch
 */
const TagSearch: FC<TagSearchProps> = () => {

  /**
   * Hooks
   */

  /**
   * Effects
   */
  useEffect(() => {
  }, []);

  /**
   * Handlers
   */
  function handleAddTagToPost(tagId: string) {
  }

  /**
   * Utility functions
   */
  return (
    <div className={classNames.tagSearchContainer}>
    </div>
  );
};

export { TagSearch };
