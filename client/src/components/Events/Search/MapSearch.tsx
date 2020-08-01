// Libs
import React, { FC, useRef, ChangeEvent } from "react";
import { motion } from "framer-motion";
import IosClose from "react-ionicons/lib/IosClose";
import MdAdd from "react-ionicons/lib/MdAdd";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Styles
import styles from "./styles.module.scss";

// Store
import { useMap } from "@stores/MapStore";
import { useEvents } from "@stores/EventStore";

// Components
import { PredictionsDropdown } from "@components/Events/PredictionsDropdown/PredictionsDropdown";
import { useMutationObserver } from "@utils/hooks/useMutationObserver";
import { log } from "@utils/Logger";

// Constants
import { SEARCH_MIN } from "@stores/EventStore/constants";

/**
 * Map address search
 */
const MapSearch: FC<{}> = () => {

  /**
   * Hooks
   */

  /**
   * ========== Context hooks
   */
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchedAddress,
    updateActiveEvent,
    closeSearch,
  } = useEvents();

  const {
    mapZoom,
    setMapZoom,
    centerMapOnAddress,
  } = useMap();

  /**
   * ========== State hooks
   */
  const containerRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * ========== Util hooks
   */
  const { windowWidth, windowHeight } = useWindowSize();

  useMutationObserver(inputRef, mutationCallback);

  /**
   * Effects
   */

  /**
   * Handlers
   */
  function handleSearch(ev: ChangeEvent<HTMLInputElement>) {

    // Get input search value
    const address = (ev.currentTarget as HTMLInputElement).value;

    updateActiveEvent({ address });

    const inputLength = address.length;

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
    closed: {
      borderRadius: "50%",
      width: 50,
      height: 50,
      x: windowWidth - 60,
      y: windowHeight - 120,
      transition: {
        type: "tween",
      },
    },
    open: {
      borderRadius: "3px",
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
  if (!isSearchOpen) {
    return null;
  }

  return (
    <motion.div
      className={styles.searchContainer}
      variants={searchVariants}
      initial={true}
      animate={isSearchOpen ? "open" : "closed"}
    >
      <div
        className={styles.searchInput}
        ref={containerRef}
      >
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
        >
          <IosClose
            fontSize="40"
            onClick={closeSearch}
            className={styles.closeBtn}
          />
        </motion.div>
      </div>
      <PredictionsDropdown/>
    </motion.div>
  );
};

export { MapSearch };
