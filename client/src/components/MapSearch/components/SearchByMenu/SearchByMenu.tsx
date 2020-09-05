// Libs
import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import {
  AnimationControls,
  PanInfo,
  useAnimation,
  useMotionValue,
  motion,
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
import { EventSearchCriteriaValue } from "@stores/globalStore/stores/search/types";
import { DRAG_STATUS, EASING_MAP } from "@common/constants";

export type MenuStateType = {
  isAnimating: boolean;
  isActive: boolean;
  isInterruptible: boolean;
}

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

const menuReducer = (state, action) => {
  switch (action.type) {

    case "ACTIVE":
      return ({
        ...state,
        isActive: action.isActive,
      });

    case "ANIMATING":
      return ({
        ...state,
        isAnimating: action.isAnimating,
      });

    default:
      return state;
  }
}

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
  const [dragStatus, setDragStatus] = useState(DRAG_STATUS.INACTIVE);

  const [menuState, setMenuState] = useReducer(menuReducer, {
    isAnimating: false,
    isActive: false,
  });

  const [selectedItem, setSelectedItem] = useState<EventSearchCriteriaValue>(searchBy);

  const [inView, setInView] = useState<EventSearchCriteriaValue>(searchBy);

  const trackRef = useRef<HTMLDivElement>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  /**
   * ========== Lib hooks
   */
  const menuAnimation = useAnimation();

  const containerRef = useOnclickOutside(() => {
    // setSelMenuTo(false);
  });

  /**
   * ========== Effects
   */
  // Scroll menu to the searchBy item
  useEffect(() => {

    if (dragStatus === DRAG_STATUS.ACTIVE) {
      return;
    }
    snapMenuTo(selectedItem, menuAnimation);

  }, [
    selectedItem,
    dragStatus
  ]);

  // Animate when menu is active/inactive
  useEffect(() => {
    if (menuState.isActive) {
      menuAnimation.start(menuVariants.open);
    }
    else {
      menuAnimation.start(menuVariants.closed);
    }
  }, [
    menuState.isActive,
  ]);

  /**
   * ========== Utils
   */
  function snapMenuTo(
    item: EventSearchCriteriaValue,
    controller: AnimationControls,
  ) {

    const snapTo = snapPoints[item] ?? 0;

    controller.start({
      y: snapTo,
      transition: {
        type: "tween",
        duration: 0.2,
      },
    });
  }

  function handleMouseEnter() {
    if (dragStatus === DRAG_STATUS.ACTIVE) {
      return;
    }
    setMenuState({ type: "ACTIVE", isActive: true });
  }

  function handleMouseLeave() {
    if (dragStatus === DRAG_STATUS.ACTIVE) {
      return;
    }
    setMenuState({ type: "ACTIVE", isActive: false });
  }


  const handleDrag = useCallback((_, { delta, offset }: PanInfo) => {
    // const menuDragY = useMotionValue(0);
    // Update drag indicator rotation based on drag velocity
    // const velocity = menuDragY.getVelocity();
    // if (velocity > 0) indicatorRotation.set(10);
    // if (velocity < 0) indicatorRotation.set(-10);
    // Make sure user cannot drag beyond the top of the sheet
    // menuDragY.set(Math.max(menuDragY.get() + delta.y, 0));
  }, []);

  const handleDragStart = useCallback(() => {
    setDragStatus(DRAG_STATUS.ACTIVE);
    // setMenuState({ type: "INTERRUPTIBLE", isInterruptible: true});
  }, []);

  // When dragging ends, set the current inView item as the selectedItem
  const handleDragEnd = useCallback((_, { velocity, point, offset }: PanInfo) => {

    // Another way to calculate snapTo position is to find which snapPoints
    // the menu's current y position is closest to
    // const offsetPosition = offset.y + velocity.y;
    // const closestOffset = snapPoints.reduce(function (prev, cur) {
    //   return Math.abs(cur - offsetPosition) < Math.abs(prev - offsetPosition)
    //     ? cur
    //     : prev;
    // });

    invariant(inView, "Selected item not set.");

    setSelectedItem(inView);

    setDragStatus(DRAG_STATUS.INACTIVE);

  }, [
    selectedItem,
    inView,
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
        dragConstraints={trackRef}
        onAnimationStart={() => {
          setMenuState({type: "ANIMATING", isAnimating: true});
        }}
        onAnimationComplete={() => {
          setMenuState({type: "ANIMATING", isAnimating: false});
        }}
        className={classNames.Menu}
        ref={menuRef}
      >
        {EventSearchCriteria.map((item, idx) => {
            return trackRef.current
              ? <SearchByItem
                key={`menu-item-${idx}`}
                item={item}
                dragStatus={dragStatus}
                menuState={menuState}
                setMenuState={setMenuState}
                setSelectedItem={setSelectedItem}
                setInView={setInView}
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



