// Libs
import React, { FC, useRef, ChangeEvent, useEffect } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import MdAdd from "react-ionicons/lib/MdAdd";
import MdPerson from "react-ionicons/lib/MdPerson";
import IosSearchOutline from "react-ionicons/lib/IosSearchOutline";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Styles
import classNames from "./styles.module.scss";

// Store
import { useEvents } from "@stores/EventStore";
import { MENU_SIZE, PADDING_1, PADDING_2, TIMELINE_HEIGHT } from "@common/constants";
import styles from "@components/Navigation/NavigationMenu/styles.module.scss";
import { NavLink } from "react-router-dom";
import { getTransformValues } from "@components/Navigation/NavigationMenu/utils/getTransformValues";

const MenuItem: FC<any> = ({
  item,
  idx,
  count,
}) => {
  return (
    <motion.div
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
      {item.icon()}
    </motion.div>
  );
};

/**
 *
 */
const EventsMenu: FC<{}> = () => {

  /**
   * ========== Context hooks
   */
  const {
    isEventOpen,
    openEvent,
    closeEvent,
    startNewEvent,
    setIsMenuOpenTo,
    isMenuOpen,
    setIsSearchOpen,
  } = useEvents();

  /**
   * ========== State hooks
   */
  const containerRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * ========== Util hooks
   */
  let { windowWidth, windowHeight } = useWindowSize();

  const controls = useAnimation();


  const menuItems = [
    {
      label: "Create",
      icon: () => <MdAdd onClick={() => startNewEvent()}/>,
      position: {x: -70, y: -40},
    },
    {
      label: "Explore",
      icon: () => <IosSearchOutline onClick={() => setIsSearchOpen(true)}/>,
      position: {x: 0, y: -80},
    },
    {
      label: "Manage",
      icon: () => <MdPerson/>,
      position: {x: 70, y: -40},
    },
  ];

  /**
   * Handlers
   */
  const handleMenu = () => {
    if (!isEventOpen) {
      startNewEvent();
    }
    if (isEventOpen) {
      closeEvent();
    }
  };

  /**
   * Framer variants
   */
  const variants = {
    default: {
      display: "flex",
      opacity: 1,
      transition: {
        delay: 0.25,
        duration: 0.25,
      },
    },
    eventIsOpen: {
      display: "none",
      opacity: 0,
    },
  };

  const getMenuIcon = () => {
    return <MdAdd/>;
  };

  const styles = {
    x: (windowWidth / 2) - (MENU_SIZE / 2),
    y: windowHeight - MENU_SIZE - PADDING_2,
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (isEventOpen) {
      controls.start("eventIsOpen");
    }
    else {
      controls.start("default");
    }
  }, [
    isEventOpen,
  ]);

  /**
   * Return JSX
   */
  return (
    <motion.div
      style={styles}
      className={classNames.eventsMenu}
    >
      <AnimatePresence initial={false}>
        {isMenuOpen && menuItems.map((item, idx) => {
            return (
              <MenuItem
                key={`menuItem-${idx}`}
                count={menuItems.length}
                item={item}
                idx={idx}
              />
            );
          },
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export { EventsMenu };
