// Libs
import React, { FC } from "react";
import { motion } from "framer-motion";

// App
import { MENU_SIZE } from "@common/constants";
import classNames from "./styles.module.scss";
import {MenuItemPropsType} from "./types";

export const MenuItem: FC<MenuItemPropsType> = ({
  item,
  idx,
  count,
}) => {
  return (
    <motion.div
      ref={item.ref}
      onClick={item.onClick}
      initial={{
        x: MENU_SIZE / 2,
        y: MENU_SIZE / 2,
        scale: 0,
      }}
      animate={{
        x: item.position.x,
        y: item.position.y,
        scale: 1,
        transition: {
          duration: 0.1,
          delay: 0.04 * idx,
          ease: "easeOut",
        },
      }}
      exit={{
        x: MENU_SIZE / 2,
        y: MENU_SIZE / 2,
        scale: 0,
        transition: {
          duration: 0.1,
          delay: (count - idx + 1) * .04,
          ease: "easeOut",
        },
      }}
      className={classNames.menuItemBase}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.90 }}
    >
      {item.icon}
    </motion.div>
  );
};