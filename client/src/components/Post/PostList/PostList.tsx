// Libs
import React, { useEffect } from "react";
import { useObservable } from "@utils/hooks/useObservable";
import { postServiceSingleton } from "@api/services";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Styles
import styles from "../../../views/posts/styles.module.scss";

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

  /**
   * Return JSX
   */
  return (
    <div className={styles.container}>
      <AnimatePresence>
        <div className={styles.postList} style={{ width: windowWidth, height: windowHeight }}>
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
      </AnimatePresence>
    </div>
  );
};

export { PostList };
