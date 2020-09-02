// Libs
import React, { FC, useRef, ChangeEvent, useState, useEffect } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";
import { getPositionFromTarget } from "@components/Events/utils/getPositionFromTarget";

// Styles
import classNames from "./styles.module.scss";

// Store
import { useSearchStore } from "@stores/globalStore/stores/search/useSearchStore";
import { useControlsStore } from "@stores/globalStore/stores/controls/useControlsStore";
import { useMapStore } from "@stores/globalStore/stores/map/useMapStore";

// Components
import { useMutationObserver } from "@utils/hooks/useMutationObserver";
import { Close, Plus } from "@components/UI/Icon";
import { PredictionsDropdown } from "./components/PredictionsDropdown";
import { SearchBySelection } from "./components/SearchByMenu";

// Constants
import { MENU_SIZE, PADDING_1, TIMELINE_HEIGHT } from "@common/constants";

/**
 * Map address search
 */
const MapSearch: FC<any> = ({ menuNode }) => {

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

  const { centerMapOnAddress } = useMapStore();

  const { isMainMenuOpen } = useControlsStore();

  /**
   * ========== Component hooks
   */
  const containerRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * ========== Util hooks
   */
  const { windowWidth, windowHeight } = useWindowSize();

  useMutationObserver(inputRef, mutationCallback);

  const containerAnimation = useAnimation();

  const plusBtnAnimation = useAnimation();

  const searchInputAnimation = useAnimation();

  const closeBtnAnimation = useAnimation();

  /**
   * Vars
   */
  const menuBBox = getPositionFromTarget(menuNode);

  /**
   * Handlers
   */
  function handleSearch(ev: ChangeEvent<HTMLInputElement>) {

    // Get input search value
    const address = (ev.currentTarget as HTMLInputElement).value;

    setSearchedAddress(address);

    centerMapOnAddress(address);
  }

  /**
   * Effects
   */
  useEffect(() => {
    if (isSearchOpen) {
      containerAnimation.start(containerVariants.openOnCenter);
    }
    else {
      if (isMainMenuOpen) {
        containerAnimation.start(containerVariants.closedOnMenuItem);
      }
      else {
        containerAnimation.start(containerVariants.closedOnMenuOrigin);
      }
    }
  }, [
    isSearchOpen,
  ]);

  /**
   * Utils
   */
  // Place focus on the input when search is open
  function mutationCallback() {
    if (!inputRef.current || !isSearchOpen) {
      return;
    }
    inputRef.current.focus();
  }

  function getInitialContainerVariant() {
    if (isMainMenuOpen) {
      return containerVariants.closedOnMenuItem;
    }
    else {
      return containerVariants.closedOnMenuOrigin;
    }
  }

  /**
   * Framer variants
   */
  const containerVariants = {
    closedOnMenuItem: {
      borderRadius: "50%",
      width: MENU_SIZE,
      height: MENU_SIZE,
      x: menuBBox?.x,
      y: menuBBox?.y,
      transition: {
        type: "tween",
      },
    },
    closedOnMenuOrigin: {
      borderRadius: "50%",
      width: MENU_SIZE,
      height: MENU_SIZE,
      x: (windowWidth / 2) - (MENU_SIZE / 2),
      y: windowHeight - TIMELINE_HEIGHT,
      transition: {
        type: "tween",
      },
    },
    openOnCenter: {
      borderRadius: "2px",
      width: 300,
      height: 40,
      x: "calc(50vw - 150px)",
      y: "calc(50vh + 32px)",
      transition: {
        type: "tween",
      },
    },
  };

  const inputVariants = {
    closed: {
      transitionEnd: {
        display: "none",
      },
    },
    open: {
      display: "flex",
    },
  };

  const buttonVariants = {
    closed: {
      display: "flex",
    },
    open: {
      transitionEnd: {
        display: "none",
      },
    },
  };

  /**
   * Return JSX
   */
  return (
    <motion.div
      className={classNames.searchContainer}
      animate={containerAnimation}
      variants={containerVariants}
      initial={getInitialContainerVariant()}
    >
      <div
        className={classNames.searchInput}
        ref={containerRef}
      >
        <SearchBySelection/>
        {/*<motion.div*/}
        {/*  onClick={openSearch}*/}
        {/*  // animate={plusBtnAnimation}*/}
        {/*  // animate={isSearchOpen ? "open" : "closed"}*/}
        {/*  // variants={buttonVariants}*/}
        {/*  className={classNames.addBtn}*/}
        {/*>*/}
        {/*  <Plus/>*/}
        {/*</motion.div>*/}
        <motion.input
          ref={inputRef}
          // animate={searchInputAnimation}
          // animate={isSearchOpen ? "open" : "closed"}
          // variants={inputVariants}
          // value={searchedAddress}
          onChange={handleSearch}
        />
        <motion.div
          // animate={closeBtnAnimation}
          // animate={isSearchOpen ? "open" : "closed"}
          // variants={inputVariants}
          onClick={closeSearch}
        >
          <Close
            fontSize="40"
            className={classNames.closeBtn}
          />
        </motion.div>
      </div>
      <PredictionsDropdown/>
    </motion.div>
  );
};

export { MapSearch };
