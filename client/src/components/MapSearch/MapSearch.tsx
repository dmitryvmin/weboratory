// Libs
import React, { FC, useRef, ChangeEvent, useState, useEffect } from "react";
import { AnimatePresence, motion, useAnimation, VariantLabels } from "framer-motion";

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
import { SearchByMenu } from "./components/SearchByMenu";

// Constants
import { SIZE_5, EASING_MAP } from "@common/constants";
import {
  HEIGHT_SEARCH_CLOSED,
  WIDTH_SEARCH_CLOSED,
  WIDTH_SEARCH_OPEN,
  HEIGHT_SEARCH_OPEN,
} from "@components/MapSearch/constants";

// Types
import { MapSearchProps } from "@components/MapSearch/types";

const transitionSearchContainer = {
  ease: EASING_MAP.EASE_IN_OUT,
  duration: 0.5,
};

const transitionInput = {
  delay: 0.5,
}

const transitionCloseBtn = {
  delay: 0.5,
}

/**
 * Map address search
 */
const MapSearch: FC<MapSearchProps> = ({ menuNode }) => {

  /**
   * ========== Store hooks
   */
  const {
    setSearchedAddress,
    searchedAddress,
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
   * Effects
   */
  useEffect(() => {
    if (isSearchOpen) {
      containerAnimation.start(containerVariants.openOnCenter);
    }
    else {
      containerAnimation.start(containerVariants.closedOnOrigin);
    }
  }, [
    isSearchOpen,
  ]);

  /**
   * Vars
   */
  const menuBBox = getPositionFromTarget(menuNode);

  if (!menuBBox) {
    return null;
  }

  /**
   * Framer variants
   */
  const containerVariants = {
    initial: {
      borderRadius: "50%",
      width: WIDTH_SEARCH_CLOSED,
      height: HEIGHT_SEARCH_CLOSED,
      x: menuBBox.x,
      y: menuBBox.y,
    },
    closedOnOrigin: {
      borderRadius: [2, "50%"],
      width: [
        WIDTH_SEARCH_OPEN,
        WIDTH_SEARCH_CLOSED,
        WIDTH_SEARCH_CLOSED,
      ],
      height: HEIGHT_SEARCH_CLOSED,
      x: [
        (windowWidth / 2) - (WIDTH_SEARCH_OPEN / 2),
        menuBBox.x,
        menuBBox.x,
      ],
      y: [
        (windowHeight / 2) + (HEIGHT_SEARCH_OPEN / 2),
        menuBBox.y,
      ],
      transition: transitionSearchContainer,
    },
    openOnCenter: {
      borderRadius: ["50%", 2],
      width: [
        WIDTH_SEARCH_CLOSED,
        WIDTH_SEARCH_CLOSED,
        WIDTH_SEARCH_OPEN,
      ],
      height: HEIGHT_SEARCH_OPEN,
      x: [
        menuBBox.x,
        menuBBox.x,
        (windowWidth / 2) - (WIDTH_SEARCH_OPEN / 2),
      ],
      y: [
        menuBBox.y,
        (windowHeight / 2) + (HEIGHT_SEARCH_OPEN / 2),
      ],
      transition: transitionSearchContainer,
    },
  };

  const inputVariants = {
    closed: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
    open: {
      display: "inherit",
      opacity: 1,
      transition: transitionInput,
    },
  };

  const closeBtnVariants = {
    closed: {
      scale: 0,
      transitionEnd: {
        display: "none",
      },
    },
    open: {
      display: "inherit",
      scale: 1,
      transition: transitionCloseBtn,
    },
  };

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
   * Return JSX
   */
  return (
    <motion.div
      className={classNames.searchContainer}
      animate={containerAnimation}
      variants={containerVariants}
      initial="initial"
      exit="closedOnOrigin"
    >
      <AnimatePresence>
        {isSearchOpen &&
        <>
          <SearchByMenu/>
          <motion.input
            ref={inputRef}
            className={classNames.searchInput}
            variants={inputVariants}
            animate="open"
            initial="closed"
            exit="closed"
            value={searchedAddress}
            onChange={handleSearch}
          />
          <motion.div
            variants={closeBtnVariants}
            animate="open"
            initial="closed"
            exit="closed"
            onClick={closeSearch}
          >
            <Close
              fontSize="40"
              className={classNames.closeBtn}
            />
          </motion.div>
          <PredictionsDropdown/>
        </>
        }
      </AnimatePresence>
    </motion.div>
  );
};

export { MapSearch };
