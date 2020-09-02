// Libs
import React, { FC, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Components
import { Search, Plus, User } from "@components/UI/Icon";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Styles
import classNames from "./styles.module.scss";

// Store
import { MENU_SIZE, PADDING_2 } from "@common/constants";
import { useEventStore } from "@stores/globalStore/stores/event/useEventStore";
import { useSearchStore } from "@stores/globalStore/stores/search/useSearchStore";
import { useControlsStore } from "@stores/globalStore/stores/controls/useControlsStore";
import { MenuItem } from "@components/Controls/EventsMenu/components/MenuItem";

/**
 *
 */
const EventsMenu: FC<any> = ({menuRefs}) => {

  const {menuRef1, menuRef2} = menuRefs;

  /**
   * ========== Hooks
   */

  /**
   * App state hooks
   */
  const { startNewEvent } = useEventStore();
  const { openSearch } = useSearchStore();
  const { isMainMenuOpen } = useControlsStore();

  /**
   * Local state hooks
   */
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Util hooks
   */
  const { windowWidth, windowHeight } = useWindowSize();

  // const controls = useAnimation();

  const menuItems = [
    {
      label: "Create",
      icon: <Plus/>,
      position: { x: -70, y: -40 },
      onClick: () => startNewEvent(),
      ref: menuRef1,
    },
    {
      label: "Explore",
      icon: <Search/>,
      position: { x: 0, y: -80 },
      onClick: openSearch,
      ref: menuRef2,
    },
    {
      label: "Manage",
      icon: <User/>,
      position: { x: 70, y: -40 },
    },
  ];

  /**
   * Handlers
   */
  // const handleMenu = () => {
  //   if (!isEventOpen) {
  //     startNewEvent();
  //   }
  //   if (isEventOpen) {
  //     closeEvent();
  //   }
  // };

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

  const styles = {
    x: (windowWidth / 2) - (MENU_SIZE / 2),
    y: windowHeight - MENU_SIZE - PADDING_2,
  };

  /**
   * Effects
   */
  // useEffect(() => {
  //   if (isEventOpen) {
  //     controls.start("eventIsOpen");
  //   }
  //   else {
  //     controls.start("default");
  //   }
  // }, [
  //   isEventOpen,
  // ]);

  /**
   * Return JSX
   */
  return (
    <motion.div
      style={styles}
      className={classNames.eventsMenu}
    >
      <AnimatePresence initial={false}>
        {isMainMenuOpen && menuItems.map((item, idx) => {
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
