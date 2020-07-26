// Libs
import React, { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IosMenu from "react-ionicons/lib/IosMenu";

// App
import { INavItem } from "@components/Navigation/Nav/Nav";

// Styles
import styles from "../NavigationMenu/styles.module.scss";
import { NavLink } from "react-router-dom";

// Constants
const MENU_SIZE = 50;

// Gets x/y coordinates for displaying menu items in the second quadrant
function getTransformValues(
  count: number,
  idx: number,
) {
  const itemHeight = 20;
  // span of the arc
  const arcSpan = 120;
  // radius - hypotenuse
  const arcRadius = 80;
  // angle distance between items
  const angleSeparation = arcSpan / (count - 1);
  const idxAngle = angleSeparation * idx - ((arcSpan - 90) / 2) - 20;
  const idxAngleRadians = (Math.PI / 180) * idxAngle;
  // adjacent
  const x = Math.cos(idxAngleRadians) * -arcRadius;
  // opposite side
  const y = Math.sin(idxAngleRadians) * -arcRadius;

  return ({
    x: x - 10,
    y: y - 0,
  });
}

const menuVariants = {
  open: {
    scale: 0.75,
  },
  closed: {
    scale: 1,
  },
};

type IMenuItem = {
  item: INavItem;
  idx: number;
  // isOpen: boolean;
  count: number;
};

const MenuItem: FC<IMenuItem> = ({
  item,
  idx,
  // isOpen,
  count,
}) => {

  // Break up animation into frames for the roll-out effect
  const frames = Array.from({ length: idx + 1 }, (v, i) => i);

  // Get get transform arrays for x/y position
  const xTransform = frames.map(frame => getTransformValues(count, frame).x);
  const yTransform = frames.map(frame => getTransformValues(count, frame).y);

  return (
    <motion.div
      initial={{
        x: MENU_SIZE / 2,
        y: MENU_SIZE / 2,
        scale: 0,
      }}
      animate={{
        x: [MENU_SIZE / 2, ...xTransform],
        y: [MENU_SIZE / 2, ...yTransform],
        scale: [0, 1],
        transition: {
          duration: 0.1,
          delay: 0.04 * idx,
          ease: "easeOut",
        },
      }}
      exit={{
        x: [...xTransform.reverse(), MENU_SIZE / 2],
        y: [...yTransform.reverse(), MENU_SIZE / 2],
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
        {item.label}
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
      <IosMenu onClick={() => toggleMenu()}/>
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
