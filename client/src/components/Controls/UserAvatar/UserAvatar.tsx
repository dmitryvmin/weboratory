// Libs
import React, { FC, useContext, useEffect, useRef, useState, Suspense } from "react";
import { motion, motionValue, useAnimation, useMotionValue } from "framer-motion";

// Components

// Styles
import classNames from "./styles.module.scss";

// Utils

// Store

// Types
export type ITimeline = any;
import { UserAvatarProps } from "@components/Controls/UserAvatar/types";
import { Auth0Context } from "@utils/hooks/useAuth0";
import { log } from "@dmitrymin/fe-log";
import { useAuth0 } from "@auth0/auth0-react";
import { LazyImage } from "@components/Controls/UserAvatar/Image";

/**
 * Timeline Controls
 *
 * References:
 * - https://gist.github.com/steveruizok/6e293980318783e4fbf0abc7c43a83d8
 * - https://codesandbox.io/s/framer-motion-drag-to-reorder-pkm1k?file=/src/Example.tsx:843-854
 */
const UserAvatar: FC<UserAvatarProps> = () => {

  /**
   * =============== Hooks ===============
   */

  /**
   * Store Hooks
   */
  // const { toggleMainMenu } = useControlsStore();

  /**
   * Component hooks
   */
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Util hooks
   */
  const animate = useAnimation();

  const { user, isAuthenticated } = useAuth0();

  log("user");

  /**
   * Handlers
   */

  /**
   * Render JSX
   */
  if (!isAuthenticated) {
    return null;
  }

  return (
    <motion.div
      ref={containerRef}
      className={classNames.UserAvatar}
    >
      <LazyImage
        className={classNames.Avatar}
        src={user.picture}
      />
    </motion.div>
  );
};

export { UserAvatar };
