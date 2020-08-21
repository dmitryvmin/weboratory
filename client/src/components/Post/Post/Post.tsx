// Libs
import React, { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { useHistory, Link, match as Imatch } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { motion, useAnimation } from "framer-motion";

// API
import { EditorService, PostService, TagMapService } from "@api/services";

// Components
import { PostMenu } from "@components/Post/PostMenu";
import { Editor } from "@components/Editor/Editor";
import {Plus, Close} from "@components/UI/Icon";

// Styles
import classNames from "./styles.module.scss";

// Types
import { useWindowOffset } from "@utils/hooks/useWindowOffset";
import { useObservable } from "@utils/hooks/useObservable";
import { PostProps } from "@components/Post/Post/types";
import { PostTags } from "@components/Post/PostTags";

// Utils
import { checkIfSelected } from "./utils";
import { EditorProvider } from "@stores/EditorStore";

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

function getPostState(
  title: string | undefined,
  isSelected: boolean | undefined,
) {
  if (!!isSelected && !!title) {
    return "postSavedActive";
  }
  if (!!isSelected && !title) {
    return "postNewActive";
  }
  if (!isSelected && !!title) {
    return "postSavedInactive";
  }
  if (!isSelected && !title) {
    return "postNewInactive";
  }
}

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

  const animationControls = useAnimation();

  const match: Imatch<{ id: string }> | null = useRouteMatch("/posts/:id");

  const isSelected = checkIfSelected(title, match);

  const tagMapSingleton = useRef<TagMapService>(new TagMapService());

  const postSingleton = useRef<PostService>(new PostService());

  const [postTitle, setPostTitle] = useState<string>("New Post");

  const { pageYOffset } = useWindowOffset();

  const editorSingleton = useRef<EditorService>(new EditorService());

  const editorContent$ = useObservable(editorSingleton.current.onEditorContent());

  /**
   * Effects
   */
  const xPosition = post ? idx! % Math.floor(windowWidth / 310) * 310 + 10 : undefined;

  const yPosition = post ? Math.floor(idx! / Math.floor(windowWidth / 300) + 1) * 320 - 200 : undefined;

  useEffect(() => {
    if (content === undefined) {
      return;
    }
    editorSingleton.current.setEditorContent(content);
  }, [
    content,
  ]);

  useEffect(() => {
    if (isSelected) {
      if (windowWidth < 620) {
        animationControls.start("activeMobile");
      }
      else {
        animationControls.start("activeDesktop");
      }
    }
    else {
      if (title) {
        animationControls.start("inactiveSavedPost");
      }
      else {
        animationControls.start("inactiveNewPost");
      }
    }
  }, [
    isSelected,
    windowWidth,
  ]);

  /**
   * Handlers
   */
  function handleEditorChange(content: string) {
    editorSingleton.current.setEditorContent(content);
  }

  function handlePostClick() {
    if (isSelected) {
      return;
    }
    history.push(`/posts/${title ?? "new"}`);
  }

  function handlePostSave() {
    if (post) {
      postSingleton.current.savePost(post.id, { title: title, content: editorContent$ });
    }
    else {
      postSingleton.current.addPost({ title: postTitle, content: editorContent$ });
    }
  }

  function handleTitle(ev: SyntheticEvent<HTMLInputElement>) {
    const value = (ev.target as HTMLInputElement).value;
    setPostTitle(value);
  }

  const postVariants = {
    inactiveSavedPost: {
      width: 300,
      height: 300,
      x: xPosition,
      y: yPosition,
      transition: {
        type: "tween",
      },
    },
    inactiveNewPost: {
      width: 50,
      height: 50,
      x: windowWidth - 60,
      y: windowHeight - 55,
      transition: {
        type: "tween",
      },
    },
    activeDesktop: {
      width: 600,
      height: "100%",
      x: (windowWidth - 620) / 2,
      y: pageYOffset + 120,
      transition: {
        type: "tween",
      },
    },
    activeMobile: {
      width: windowWidth - 20,
      height: "100%",
      x: 10,
      y: pageYOffset + 120,
      transition: {
        type: "tween",
      },
    },
    exit: {
      scale: 0,
    },
  };

  function getClassNames() {
    const postState = getPostState(title, isSelected);
    return [
      classNames.post,
      postState && classNames[postState],
    ].join(" ");
  }

  return (
    <EditorProvider>
      <motion.div
        onClick={handlePostClick}
        animate={animationControls}
        variants={postVariants}
        exit="exit"
        className={getClassNames()}
      >
        <>
          {(!title && !isSelected) &&
          <div className={classNames.addNewBtn}>
            <Plus fontSize="40"/>
          </div>
          }

          {title &&
          <>
            <div className={classNames.header}>
              <input
                className={classNames.title}
                value={title !== undefined ? title : postTitle}
                onChange={handleTitle}
              />

              <motion.div className={classNames.close} variants={closeVariants}>
                <Link to="/posts">
                  <Close fontSize="40"/>
                </Link>
              </motion.div>
            </div>

            <div className={classNames.postMenu}>
              <PostMenu
                post={post}
                handleSave={handlePostSave}
                tagMapSingleton={tagMapSingleton.current}
                editorSingleton={editorSingleton.current}
              />
            </div>

            <div className={classNames.postTags}>
              <PostTags
                post={post}
                tagMapSingleton={tagMapSingleton.current}
              />
            </div>

            <Editor
              content={content}
              onEditorChange={handleEditorChange}
            />
          </>
          }
        </>
      </motion.div>
    </EditorProvider>
  );
};

export { Post };
