// Libs
import React, { FC, SyntheticEvent, useRef, useState } from "react";
import { useHistory, Link, match as Imatch } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { motion } from "framer-motion";
import IosClose from "react-ionicons/lib/IosClose";

// API
import { editorService, postService, tagMapService } from "@api/services";

// Components
import { PostMenu } from "@components/Post/PostMenu";
import { Editor } from "@components/Editor/Editor";

// Styles
import styles from "./styles.module.scss";

// Types
import { useWindowOffset } from "@utils/hooks/useWindowOffset";
import { useObservable } from "@utils/hooks/useObservable";
import { PostProps } from "@components/Post/Post/types";
import { checkIfSelected } from "./utils";

const transition = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const closeVariants = {
  exit: {
    x: 50,
    opacity: 0,
    transition,
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      // delay: 1,
      ...transition,
    },
  },
};

const Post: FC<PostProps> = ({
  post,
  idx,
  windowWidth,
  windowHeight,
}) => {

  const {
    created_at,
    updated_at,
    content,
    draft,
    title,
    id,
  } = post || {};

  // useEffect(() => {
  //   if (!editorServiceSingleton) {
  //     return;
  //   }
  //   const subscription = editorServiceSingleton
  //     .onEditorState()
  //     .subscribe((state) => {
  //       // @ts-ignore
  //       setEditorContent(state.content);
  //     });
  //
  //   return () => subscription.unsubscribe();
  // }, [editorServiceSingleton]);

  /**
   * Hooks
   */
  const history = useHistory();

  const match: Imatch<{ id: string }> | null = useRouteMatch("/posts/:id");

  const isSelected = checkIfSelected(title, match);

  const tagMapSingleton = useRef<tagMapService>(new tagMapService());

  const postSingleton = useRef<postService>(new postService());

  const editorSingleton = useRef<editorService>(new editorService());

  const [postTitle, setPostTitle] = useState<string>(post ? "" : "New Post");

  const { pageYOffset } = useWindowOffset();

  const editor$ = useObservable(editorSingleton.current.onEditorContent());

  /**
   * Effects
   */
  const xPosition = post ? idx! % Math.floor(windowWidth / 300) * 300 : undefined;

  const yPosition = post ? Math.floor(idx! / Math.floor(windowWidth / 300) + 1) * 320 - 200 : undefined;

  /**
   * Handlers
   */
  function handleEditorChange(content: string) {
    // editorSingleton.current.setEditorContent(content);
  }

  function handlePostClick() {

    if (isSelected) {
      return;
    }
    history.push(`/posts/${title ?? "new"}`);
  }

  function handlePostSave() {
    if (post) {
      postSingleton.current.savePost(post.id, title, editorSingleton);
    }
    else {
      postSingleton.current.addPost(editor$!, postTitle);
    }
  }

  function handleTitle(ev: SyntheticEvent<HTMLInputElement>) {
    const value = (ev.target as HTMLInputElement).value;
    if (value) {
      setPostTitle(value);
    }
  }

  const postVariants = {
    inactive: {
      borderRadius: "50%",
      width: post ? 300 : 50,
      height: post ? 300 : 50,
      // left: xOffset,
      // top: yOffset,
      x: post ? xPosition : windowWidth - 60,
      y: post ? yPosition : windowHeight - 55,
      // scale: scale as any,
      transition: {
        type: "tween",
      },
    },
    active: {
      borderRadius: "0%",
      width: windowWidth > 620 ? 600 : windowWidth - 20,
      height: "100%",
      x: windowWidth > 620 ? (windowWidth - 620) / 2 : 10,
      y: pageYOffset + 120,
      // scale: 1,
      transition: {
        type: "tween",
      },
    },
  };

  return (
    <motion.div
      // layout // TODO
      onClick={handlePostClick}
      // drag={!isSelected}
      initial="inactive"
      animate={isSelected ? "active" : "inactive"}
      exit="inactive"
      variants={postVariants}

      className={[
        styles.post,
        isSelected ? styles.postSelected : styles.postUnselected,
      ].join(" ")}
    >
      <div className={styles.header}>
        <input
          className={styles.title}
          value={postTitle.length ? postTitle : title}
          onChange={handleTitle}
        />
        {isSelected &&
        <motion.div className={styles.close} variants={closeVariants}>
          <Link to="/posts">
            <IosClose fontSize="40"/>
          </Link>
        </motion.div>
        }
      </div>
      <div className={styles.postMenu}>
        <PostMenu
          post={post}
          handleSave={handlePostSave}
          tagMapSingleton={tagMapSingleton.current}
          editorSingleton={editorSingleton.current}
        />
        {/*<PostTags*/}
        {/*  post={post}*/}
        {/*  tagMapSingleton={tagMapSingleton.current}*/}
        {/*/>*/}
      </div>
      <Editor
        content={content}
        onEditorChange={handleEditorChange}
      />
    </motion.div>
  );
};

export { Post };
