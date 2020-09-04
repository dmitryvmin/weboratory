// Libs
import React, { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";

// Components
import {Menu} from "@components/UI/Icon";

// App
import { INavItem } from "@components/Navigation/Nav/Nav";

// Styles
import styles from "../NavigationMenu/styles.module.scss";

// Common
import { SIZE_5 } from "@common/constants";

import { NavigationMenuItem } from "@components/Navigation/NavigationMenu/types";
import { getTransformValues } from "@components/Navigation/NavigationMenu/utils/getTransformValues";

const menuVariants = {
  open: {
    scale: 0.75,
  },
  closed: {
    scale: 1,
  },
};

const MenuItem: FC<NavigationMenuItem> = ({
  item,
  idx,
  // isOpen,
  count,
}) => {

  // Break up animation into frames for the roll-out effect
  const frames = Array.from({ length: idx + 1 }, (v, i) => i);

  // Get get transform arrays for x/y position
  const xTransform = frames.map(frame => getTransformValues({count, idx: frame}).x);
  const yTransform = frames.map(frame => getTransformValues({count, idx: frame}).y);

  return (
    <motion.div
      initial={{
        x: SIZE_5 / 2,
        y: SIZE_5 / 2,
        scale: 0,
      }}
      animate={{
        x: [SIZE_5 / 2, ...xTransform],
        y: [SIZE_5 / 2, ...yTransform],
        scale: [0, 1],
        transition: {
          duration: 0.1,
          delay: 0.04 * idx,
          ease: "easeOut",
        },
      }}
      exit={{
        x: [...xTransform.reverse(), SIZE_5 / 2],
        y: [...yTransform.reverse(), SIZE_5 / 2],
        scale: [1, 0],
        transition: {
          duration: 0.1,
          delay: (count - idx + 1) * .04,
          ease: "easeOut",
        },
      }}
      className={styles.menuItemBase}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.90 }}
    >
      <NavLink to={item.to} {...item.props}>
        {item.icon ?? item.label}
      </NavLink>
    </motion.div>
  );
};

const MenuButton = ({ isOpen, toggleMenu }) => {
  return (
    <motion.div
      className={styles.menuButtonBase}
      variants={menuVariants}
      initial="open"
      animate={isOpen ? "open" : "closed"}
    >
      <Menu onClick={() => toggleMenu()}/>
    </motion.div>
  );
};

export type INavigationMenu = {
  items: any[];
};

const NavigationMenu = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((s) => !s);
  };

  return (
    <div className={styles.menuContainerBase}>
      <AnimatePresence initial={false}>
        {isOpen && items.map((item, idx) => {
            return (
              <MenuItem
                key={`menuItem-${idx}`}
                count={items.length}
                item={item}
                idx={idx}
              />
            );
          },
        )}
      </AnimatePresence>
      <MenuButton
        isOpen={isOpen}
        toggleMenu={toggleMenu}
      />
    </div>
  );
};

export { NavigationMenu };
