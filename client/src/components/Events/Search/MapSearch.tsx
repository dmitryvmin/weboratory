// Libs
import React, { FC, useRef, ChangeEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IosClose from "react-ionicons/lib/IosClose";
import MdAdd from "react-ionicons/lib/MdAdd";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";
import { getPositionFromTarget } from "@components/Events/utils/getPositionFromTarget";

// Styles
import styles from "./styles.module.scss";

// Store
import { useMap } from "@stores/MapStore";
import { useEvents } from "@stores/EventStore";

// Components
import { useMutationObserver } from "@utils/hooks/useMutationObserver";
import { log } from "@utils/Logger";

// Constants
import { MENU_SIZE, PADDING_1, TIMELINE_HEIGHT } from "@common/constants";
import { PredictionsDropdown } from "../PredictionsDropdown";

/**
 * Map address search
 */
const MapSearch: FC<any> = ({ menuNode }) => {

  /**
   * ========== Context hooks
   */
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchedAddress,
    updateActiveEvent,
    closeSearch,
    isMenuOpen,
    isEventOpen,
    setSearchedAddressTo,
  } = useEvents();

  const {
    mapZoom,
    setMapZoom,
    centerMapOnAddress,
  } = useMap();

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

    setSearchedAddressTo(address);

    centerMapOnAddress(address);

    // let newZoom = mapZoom;
    // // Zoom in when input gets longer
    // if (inputLength < SEARCH_MIN) {
    //   newZoom = 12;
    // }
    // else if (inputLength >= SEARCH_MIN && inputLength < 26) {
    //   newZoom = (inputLength / 1.5) + 8;
    // }
    // else {
    //   newZoom = 18;
    // }
    // log("!!!!!!!!!!!!!", inputLength < SEARCH_MIN, inputLength >= SEARCH_MIN && inputLength < 20, inputLength, newZoom);
    // setMapZoom(newZoom);
  }

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
   * Framer variants
   */
  const searchVariants = {
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
      y: windowHeight - TIMELINE_HEIGHT - PADDING_1,
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

  const getInitialVariant = () => {
    if (isMenuOpen) {
      return "closedOnMenuItem";
    }
    else {
      return "closedOnMenuOrigin";
    }
  };

  const getAnimationVariant = () => {
    if (isSearchOpen) {
      return "openOnCenter";
    }
    else {
      if (isMenuOpen) {
        return "closedOnMenuItem";
      }
      else {
        return "closedOnMenuOrigin";
      }
    }
  };

  const renderSelectionMenu = () => {
    return ["Search Address", "Search Event Hashtag", "Search Event Info"].map((item) => {
      return <div>{item}</div>;
    });
  };

  /**
   * Return JSX
   */
  return (
    <motion.div
      className={styles.searchContainer}
      variants={searchVariants}
      initial={getInitialVariant()}
      animate={getAnimationVariant()}
    >
      <div
        className={styles.searchInput}
        ref={containerRef}
      >
        <motion.div>
          {renderSelectionMenu()}
        </motion.div>
        <motion.div
          onClick={() => setIsSearchOpen(true)}
          animate={isSearchOpen ? "open" : "closed"}
          variants={buttonVariants}
          className={styles.addBtn}
        >
          <MdAdd/>
        </motion.div>
        <motion.input
          ref={inputRef}
          animate={isSearchOpen ? "open" : "closed"}
          variants={inputVariants}
          value={searchedAddress}
          onChange={handleSearch}
        />
        <motion.div
          animate={isSearchOpen ? "open" : "closed"}
          variants={inputVariants}
          onClick={closeSearch}
        >
          <IosClose
            fontSize="40"
            className={styles.closeBtn}
          />
        </motion.div>
      </div>
      <PredictionsDropdown/>
    </motion.div>
  );
};

export { MapSearch };
