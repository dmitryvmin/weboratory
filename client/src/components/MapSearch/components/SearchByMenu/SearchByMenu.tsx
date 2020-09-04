// Libs
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence, AnimationControls,
  motion, PanInfo,
  useAnimation, useDragControls, useMotionValue,
  useSpring,
} from "framer-motion";
import invariant from "invariant";

// Styles
import classNames from "./styles.module.scss";

// Components
import { SearchByItem } from "@components/MapSearch/components/SearchByMenu/SearchByItem";

// Constants
import { SEARCH_BY_ITEM_HEIGHT, SEARCH_BY_MENU_HEIGHT, SEARCH_BY_MENU_WIDTH } from "./constants";

// Utils
import useOnclickOutside from "@utils/hooks/useOnClickOutside";

// Store
import { EventSearchCriteria } from "@stores/globalStore/stores/search/searchDefaults";
import { useSearchStore } from "@stores/globalStore/stores/search/useSearchStore";
import { EventSearchCriteriaValue, EventSearchCriterium } from "@stores/globalStore/stores/search/types";
import { getItemY } from "@components/MapSearch/components/SearchByMenu/utils";
import { DRAG_STATUS, TRANS_MAP } from "@common/constants";
import { ValueOf } from "@utils/ts";
import { useWindowSize } from "@utils/hooks/useWindowSize";

const menuVariants = {
  closed: {
    // scale: 0,
    // opacity: 0,
    // transitionEnd: {
    //   display: "none",
    // },
  },
  open: {
    // scale: 1,
    // display: "inherit",
    // opacity: 1,
  },
};

const snapPoints = EventSearchCriteria.reduce((acc, cur, idx) => {
  const key = cur.value;
  const offset = (idx < 1) ? 0 : -idx * SEARCH_BY_ITEM_HEIGHT;
  return ({
    ...acc,
    [key]: offset,
  });
}, {});

/**
 * SearchBySelection
 */
export const SearchByMenu = () => {

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
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  const [dragStatus, setDragStatus] = useState(DRAG_STATUS.INACTIVE);

  const [isAnimActive, setIsAnimActive] = useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState<EventSearchCriteriaValue>(searchBy);

  const trackRef = useRef<HTMLDivElement>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  /**
   * ========== Lib hooks
   */
  const menuAnimation = useAnimation();

  // const y = useMotionValue(0);

  // const y = useSpring(0, {
  //   // damping: 10,
  // });

  const springConfig = { stiffness: 300, damping: 30, mass: 0.2 };

  // const snapPoints = EventSearchCriteria.map((child, idx) => {
  //   // return index * -SEARCH_BY_ITEM_HEIGHT;
  //   return (EventSearchCriteria.length - idx) * SEARCH_BY_ITEM_HEIGHT;
  // });


  const menuDragY = useMotionValue(0);

  const menuSpringY = useSpring(menuDragY, springConfig);

  const containerRef = useOnclickOutside(() => {
    // setSelMenuTo(false);
  });

  const dragControls = useDragControls();

  const getClosest = (nums: number[], goal: number) => {
    return nums.reduce((prev, curr) => {
      return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
    });
  };

  const y = menuDragY;
  // const y = (dragStatus === DRAG_STATUS.ACTIVE) ? menuDragY : menuSpringY;


  // useEffect(() => {
  //   function updateOpacity() {
  //     const curY = y.get();
  //     console.log("===== Y SUB =====", curY);
  //   }
  //
  //   const unsubscribeY = y.onChange(updateOpacity)
  //
  //   return () => {
  //     unsubscribeY()
  //   }
  // }, [])

  /**
   * ========== Effects
   */
  // Scroll menu to the searchBy item
  // useEffect(() => {
  //
  //   if (dragStatus === DRAG_STATUS.ACTIVE || isAnimActive) {
  //     return;
  //   }
  //   else if (dragStatus === DRAG_STATUS.INACTIVE) {
  //     snapMenuTo(selectedItem, menuAnimation);
  //   }
  //
  // }, [
  //   dragStatus,
  //   selectedItem,
  //   menuAnimation,
  // ]);

  function snapMenuTo(
    item: EventSearchCriteriaValue,
    controller: AnimationControls,
    ) {

    const snapTo = snapPoints[item] ?? 0;

    controller.start({
      y: snapTo,
      // transition: {
      //   type: TRANS_MAP.EASE_IN,
      //   stiffness: 400,
      //   damping: 200,
      //   mass: 1,
      // },
    });
  }

  // Animate when menu is active/inactive
  useEffect(() => {
    if (isMenuActive) {
      menuAnimation.start(menuVariants.open);
    }
    else {
      menuAnimation.start(menuVariants.closed);
    }
  }, [
    isMenuActive,
  ]);


  /**
   * ========== Utils
   */
  function handleMouseEnter() {
    // if (dragStatus === DRAG_STATUS.ACTIVE && isMenuActive) {
    //   return;
    // }
    setIsMenuActive(true);
  }

  function handleMouseLeave() {
    // if (dragStatus === DRAG_STATUS.INACTIVE && !isMenuActive) {
    //   return;
    // }
    setIsMenuActive(false);
  }


  const handleDrag = useCallback((_, { delta, offset }: PanInfo) => {
    // Update drag indicator rotation based on drag velocity
    // const velocity = menuDragY.getVelocity();
    // if (velocity > 0) indicatorRotation.set(10);
    // if (velocity < 0) indicatorRotation.set(-10);
    // Make sure user cannot drag beyond the top of the sheet
    // menuDragY.set(Math.max(menuDragY.get() + delta.y, 0));
  }, []);

  const handleDragStart = useCallback(() => {
    setDragStatus(DRAG_STATUS.ACTIVE);
  }, [
    menuAnimation,
    menuDragY,
  ]);

  const handleDragEnd = useCallback((_, { velocity, point, offset }: PanInfo) => {

    // Another way to calculate snapTo position is to find which snapPoints
    // the current menu y position is cloest to
    // const offsetPosition = offset.y + velocity.y;
    // const closestOffset = snapPoints.reduce(function (prev, cur) {
    //   return Math.abs(cur - offsetPosition) < Math.abs(prev - offsetPosition)
    //     ? cur
    //     : prev;
    // });

    invariant(selectedItem, "A selected item not set.");

    snapMenuTo(selectedItem, menuAnimation);


    setDragStatus(DRAG_STATUS.INACTIVE);

  }, [
    menuAnimation,
    selectedItem,
  ]);


  /**
   * ========== JSX
   */
  return (
    <motion.div
      ref={trackRef}
      className={classNames.Track}
    >
      <motion.div
        drag="y"
        layout="position"
        style={{
          height: SEARCH_BY_MENU_HEIGHT,
          width: SEARCH_BY_MENU_WIDTH,
        }}

        whileTap={{ cursor: "grabbing" }}

        animate={menuAnimation}
        variants={menuVariants}

        initial="closed"
        exit="closed"

        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}

        onDrag={handleDrag}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}

        // dragConstraints={{
        //   // bottom: 0,
        //   // top: SEARCH_BY_MENU_HEIGHT,
        // }}

        // dragTransition={{
        //   power: 0.5,
        //   timeConstant: 300,
        //   modifyTarget: target => {
        //     return 0;
        //   },
        // }}

        // initial={{ y: windowHeight}}
        // animate={{ y: snapPoints[0], transition: { type: 'tween' } }}
        // exit={{ y: windowHeight }}

        // dragConstraints={trackRef}
        onAnimationStart={() => setIsAnimActive(true)}
        onAnimationComplete={() => setIsAnimActive(false)}

        className={classNames.Menu}
        ref={menuRef}
      >
        {EventSearchCriteria.map((item, idx) => {
            return trackRef.current
              ? <SearchByItem
                key={`menu-item-${idx}`}
                item={item}
                dragStatus={dragStatus}
                isMenuActive={isMenuActive}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                root={trackRef.current}
                idx={idx}
              />
              : null;
          },
        )}
      </motion.div>
    </motion.div>
  );
};



