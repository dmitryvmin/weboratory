// Libs
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Styles
import classNames from "./styles.module.scss";

// Components
import { Text } from "@components/UI/Text";

// Utils
import { useIntersectionObserver } from "@utils/hooks/useIntersectionObserver";

// Store
import { EventSearchCriteria } from "@stores/globalStore/stores/search/searchDefaults";
import { useSearchStore } from "@stores/globalStore/stores/search/useSearchStore";
import useOnclickOutside from "@utils/hooks/useOnClickOutside";
import { EventSearchCriteriaValue, EventSearchCriterium } from "@stores/globalStore/stores/search/types";
import { Search } from "@components/UI/Icon";

const itemHeight = 34;
const itemWidth = 80;

function getItemIdx(value: EventSearchCriteriaValue) {
  for (let i = 0; i < EventSearchCriteria.length; i++) {
    const thisItem = EventSearchCriteria[i];
    if (thisItem.value === value) {
      return i;
    }
  }
}

function getMenuOffsetForItem(itemIdx) {
  return -itemIdx * itemHeight - 9;
}

/**
 * SearchBySelection
 */
export const SearchBySelection = () => {

  /**
   * ========== Store hooks
   */
  const {
    setSearchedAddress,
    openSearch,
    closeSearch,
    isSearchOpen,
    isSearchClosed,
    searchBy,
    setSearchBy,
  } = useSearchStore();

  /**
   * ========== Component hooks
   */
  const [isSelMenuOpen, setSelMenuTo] = useState<boolean>(true);

  const [isDragActive, setDragActiveTo] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);

  /**
   * ========== Lib hooks
   */
  const selMenuAnimation = useAnimation();

  const menuY = useMotionValue(0);

  const containerRef = useOnclickOutside(() => {
    // setSelMenuTo(false);
  });

  /**
   * ========== Vars
   */
  const menuWidth = 80;
  const itemCount = EventSearchCriteria.length;
  const menuHeight = itemCount * itemHeight;

  const selMenuVariants = {
    active: {},
    inactive: {},
  };

  /**
   * ========== Effects
   */
  useEffect(() => {
    if (isSelMenuOpen) {
      selMenuAnimation.start(selMenuVariants.active);
    }
    else {
      selMenuAnimation.start(selMenuVariants.inactive);
    }
  }, [
    isSelMenuOpen,
  ]);

  useEffect(() => {
    const activeIdx = getItemIdx(searchBy);
    const activeYOffset = getMenuOffsetForItem(activeIdx);

    const curY = menuY.get();

    menuY.set(curY + activeYOffset);
  }, [
    searchBy,
  ]);

  // useEffect(() => {
  //
  //   menuY.onChange(latest => {
  //   });
  //
  // }, [
  //   // menuY,
  // ]);

  /**
   * ========== Utils
   */
  // function handleItemClick(item) {
  //   if (!isSelMenuOpen) {
  //     return;
  //   }
  //   setSearchBy(item);
  // }

  function handleDragstart() {
    // if (isSelMenuOpen) {
    //   return;
    // }
    // setSelMenuTo(true);
    // setDragActiveTo(true);
  }

  function handleMouseEnter() {
    // if (isDragActive) {
    //   return;
    // }
    // setDragActiveTo(true);
    // setSelMenuTo(true);
  }

  function handleMouseLeave() {
    // if (!isDragActive) {
    //   return;
    // }
    // setDragActiveTo(false);
    // setSelMenuTo(false);
  }

  function handleDragEnd() {
    // if (!setSelMenuTo) {
    //   return;
    // }
    // const y = menuY.get();
    // setSelMenuTo(false);
    // setDragActiveTo(false);
  }

  console.log("$$$$", menuY);

  /**
   * ========== JSX
   */
  return (
    <motion.div
      ref={trackRef}
      className={classNames.Track}
      onMouseEnter={handleMouseEnter}
    >
      <motion.div
        drag="y"
        // drag={isDragActive ? "y" : false}
        style={{
          y: menuY,
          x: 1,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onDrag={(event, info) => {
           menuY.set(info.offset.y);
        }}
        // Cant be dragged further than...
        dragConstraints={{
          top: 0,
          bottom: 185,
        }}
        // style={{
        //   height: menuHeight,
        //   width: menuWidth,
        // }}
        ref={containerRef}
        animate={selMenuAnimation}
        variants={selMenuVariants}
        className={classNames.SelMenu}
        onDragStart={handleDragstart}
        onDragEnd={handleDragEnd}
      >
        {EventSearchCriteria.map((item, idx) => {
            return trackRef.current
              ? <MenuItem
                key={`menu-item-${idx}`}
                item={item}
                isSelMenuOpen={isSelMenuOpen}
                isDragActive={isDragActive}
                root={trackRef.current}
                menuY={menuY}
                idx={idx}
              />
              : null;
          },
        )}
      </motion.div>
    </motion.div>
  );
};

const MenuItem = ({
  item,
  isSelMenuOpen,
  isDragActive,
  root,
  menuY,
  idx,
}) => {

  /**
   * ========== Store hooks
   */
  const {
    setSearchedAddress,
    openSearch,
    closeSearch,
    isSearchOpen,
    isSearchClosed,
    searchBy,
    setSearchBy,
  } = useSearchStore();

  /**
   * ========== Component hooks
   */


  /**
   * ========== Lib hooks
   */
  const [itemRef, inView, entry] = useInView({
    root,
    threshold: .70,
  });

  const selMenuItemAnimation = useAnimation();

  /**
   * ========== Vars
   */
  const isActive = searchBy === item;

  const selMenuItemVariants = {
    active: {
      opacity: 1,
    },
    inactive: (value) => {
      return ({
        opacity: (searchBy === value) ? 1 : 0,
        // opacity: 0,
      });
    },
  };

  /**
   * ========== Effects
   */
  useEffect(() => {
    if (isSelMenuOpen) {
      selMenuItemAnimation.start(selMenuItemVariants.active);
    }
    else {
      selMenuItemAnimation.start(selMenuItemVariants.inactive);
    }
  }, [
    isSelMenuOpen,
    searchBy,
  ]);

  useEffect(() => {
    if (inView && isDragActive) {
      setSearchBy(item);
    }
  }, [
    inView,
    isDragActive,
  ]);

  return (
    <motion.div
      key={`map-search-criteria-${item.label}`}
      ref={itemRef}
      animate={selMenuItemAnimation}
      custom={item.value}
      variants={selMenuItemVariants}
      // onClick={() => handleItemClick(item)}
      initial="active
            "
      className={classNames.Item}
      style={{
        width: itemWidth,
        height: itemHeight,
      }}
    >
      {(isActive && !isDragActive) && <Search/>}
      <Text
        style="label1"
        brightness="light"
      >
        {item.label}
      </Text>
    </motion.div>
  );
};

