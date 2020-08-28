// Libs
import React, { FC, useRef, ChangeEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";
import { getPositionFromTarget } from "@components/Events/utils/getPositionFromTarget";

// Styles
import classNames from "./styles.module.scss";

// Store
import { useEvents } from "@stores/EventStore";

// Components
import { useMutationObserver } from "@utils/hooks/useMutationObserver";
import { Close, Plus } from "@components/UI/Icon";

// Constants
import { MENU_SIZE, PADDING_1, TIMELINE_HEIGHT } from "@common/constants";
import { PredictionsDropdown } from "../PredictionsDropdown";
import { useMapStore } from "@stores/globalStore/stores/map/useMapStore";

type EventSearchCriteriaLabel = "Event @" | "Event #" | "Event ⓘ";
type EventSearchCriteriaValue = "address" | "tag" | "info";
type IEventSearchCriterium = {
  label: EventSearchCriteriaLabel;
  value: EventSearchCriteriaValue;
}

const EventSearchCriteria: IEventSearchCriterium[] = [
  {
    label: "Event @",
    value: "address",
  },
  {
    label: "Event #",
    value: "tag",
  },
  {
    label: "Event ⓘ",
    value: "info",
  },
];


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

  // const {
  //   mapZoom,
  //   setMapZoom,
  //   centerMapOnAddress,
  // } = useMap();

  const { centerMapOnAddress } = useMapStore();

  /**
   * ========== Component hooks
   */
  const containerRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const [searchBy, setSearchBy] = useState<IEventSearchCriterium>(EventSearchCriteria[0]);
  const [isSelMenuOpen, setSelMenuTo] = useState<boolean>(false);

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

  const selMenuVariants = {
    active: {
      height: 30,
    },
    inactive: {
      height: 0,
    },
  };

  const renderSelectionMenu = () => {
    return (
      <div
        className={classNames.selMenu}
        onClick={() => setSelMenuTo(!isSelMenuOpen)}
      >
        <motion.div></motion.div>
          {EventSearchCriteria.map((item) => {
            return (
              <motion.div
                key={`map-search-criteria-${item.label}`}
                animate={(searchBy.label === item.label)
                  ? "active"
                  : "inactive"
                }
                variants={selMenuVariants}
                onClick={() => setSearchBy(item)}
              >
                {item.label}
              </motion.div>
            );
          })
          }
      </div>
    );
  };

  /**
   * Return JSX
   */
  return (
    <motion.div
      className={classNames.searchContainer}
      variants={searchVariants}
      initial={getInitialVariant()}
      animate={getAnimationVariant()}
    >
      <div
        className={classNames.searchInput}
        ref={containerRef}
      >
        <motion.div>
          {renderSelectionMenu()}
        </motion.div>
        <motion.div
          onClick={() => setIsSearchOpen(true)}
          animate={isSearchOpen ? "open" : "closed"}
          variants={buttonVariants}
          className={classNames.addBtn}
        >
          <Plus/>
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
