// Libs
import React, { FC, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Constants
import {
  SEARCH_BY_ITEM_WIDTH,
  SEARCH_BY_ITEM_HEIGHT,
} from "./constants";
import { DRAG_STATUS } from "@common/constants";
// Store
import { useSearchStore } from "@stores/globalStore/stores/search/useSearchStore";

// Components
import { Text } from "@components/UI/Text";

// Styles
import classNames from "@components/MapSearch/components/SearchByMenu/styles.module.scss";

// Types
import { EventSearchCriteriaValue, EventSearchCriterium } from "@stores/globalStore/stores/search/types";

type SearchByItemProps = {
  item: EventSearchCriterium;
  dragStatus: string;
  isMenuActive: boolean;
  selectedItem: EventSearchCriteriaValue;
  setSelectedItem(EventSearchCriteriaValue): void;
  root: HTMLDivElement;
  idx: number;
}

/**
 * SearchByMenu Item component
 */
export const SearchByItem: FC<SearchByItemProps> = ({
  item,
  dragStatus,
  isMenuActive,
  selectedItem,
  setSelectedItem,
  root,
  idx,
}) => {

  /**
   * ========== Hooks
   */
  const [itemRef, inView, entry] = useInView({
    root,
    threshold: 0.60,
  });

  const menuItemAnimation = useAnimation();

  const menuItemInnerAnimation = useAnimation();

  /**
   * ========== Vars
   */
  const menuItemVariants = {
    closed: {
      opacity: 0,
    },
    inactive: {
      opacity: 0,
    },
    active: {
      opacity: 1,
    },
    selected: {
      opacity: 1,
    },
  };

  const menuItemInnerVariants = {
    inactive: {
      scale: 1,
    },
    active: {
      scale: 1,
    },
    selected: {
      // scale: 1,
      scale: 1.1,
    }
  };

  /**
   * ========== Effects
   */
  // When item is in view and menu is not ,
  // set it on the searchBy prop
  useEffect(() => {
    if (
      !inView ||
      dragStatus === DRAG_STATUS.INACTIVE
      // selectedItem?.value === item.value
    ) {
      return;
    }
    // if (
    //   selectedItem?.value === item.value
    // ) {
      console.log("===== ITEM IN VIEW:",  item.value);
    //   return;
    // }
    // console.log("===== ITEM IN VIEW", item);
    setSelectedItem(item.value);
  }, [
    inView,
  ]);

  // Animate the menu item
  useEffect(() => {
    if (isMenuActive) {
      if (inView) {
        menuItemAnimation.start(menuItemVariants.selected);
        menuItemAnimation.start(menuItemInnerVariants.selected);
      }
      else {
        menuItemAnimation.start(menuItemVariants.active);
        menuItemAnimation.start(menuItemInnerVariants.active);
      }
    }
    else {
      if (inView) {
        menuItemAnimation.start(menuItemVariants.active);
      }
      else {
        menuItemAnimation.start(menuItemVariants.inactive);
      }
    }
  }, [
    isMenuActive,
    inView,
  ]);

  /**
   * ========== Handlers
   */
  function handleItemClick() {
    setSelectedItem(item.value);
  }

  /**
   * ========== JSX
   */
  return (
    <motion.div
      key={`map-search-criteria-${item.label}`}
      ref={itemRef}
      animate={menuItemAnimation}
      custom={item.value}
      variants={menuItemVariants}
      onClick={handleItemClick}
      // initial="closed"
      className={classNames.Item}
      style={{
        width: SEARCH_BY_ITEM_WIDTH,
        height: SEARCH_BY_ITEM_HEIGHT,
      }}
    >
      {/*{(isActive && !isDragActive) && <Search/>}*/}
      <motion.div
        className={classNames.ItemInner}
        style={{
          height: SEARCH_BY_ITEM_HEIGHT - 6,
        }}
        animate={menuItemInnerAnimation}
      >
        <Text
          style="label1"
          brightness="light"
        >
          {item.label}
        </Text>
      </motion.div>
    </motion.div>
  );
};