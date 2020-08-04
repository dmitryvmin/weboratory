// Libs
import React, { useEffect } from "react";
import { useObservable } from "@utils/hooks/useObservable";
import { postServiceSingleton } from "@api/services";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Styles
import classNames from "./styles.module.scss";

// Components
import { Post } from "@components/Post/Post";
import { AnimatePresence } from "framer-motion";

/**
 * About Page
 */
const PostList = () => {

  /**
   * Hooks
   */
  const post$ = useObservable(postServiceSingleton.onPosts());

  const { windowWidth, windowHeight } = useWindowSize();

  /**
   * Effects
   */
  // Fetch posts data
  useEffect(() => {
    postServiceSingleton.getAllPosts();
  }, []);

  function getContainerHeight() {
    if (!post$) {
      return "100%";
    }
    const postsCount = post$.length;
    const rowCount = Math.floor(windowWidth / 310);
    const postHeight = 310;
    const headerHeight = 120;

    // Number of posts in a row * a Post's height
    return (postsCount / rowCount * postHeight)
      // Plus remaining Posts that will be on the last row
      + (postsCount % rowCount * postHeight)
      // Header height
      + headerHeight;
  }

  /**
   * Return JSX
   */
  return (
    <div
      className={classNames.postListContainer}
      style={{
        height: getContainerHeight(),
      }}
    >
      {post$ && post$?.map((post: any, idx) => {
        return (
          <Post
            key={`post-${post?.title}-${idx}`}
            post={post}
            idx={idx}
            windowWidth={windowWidth}
            windowHeight={windowHeight}
          />
        );
      })}
      <Post
        windowWidth={windowWidth}
        windowHeight={windowHeight}
      />
    </div>
  );
};

export { PostList };
