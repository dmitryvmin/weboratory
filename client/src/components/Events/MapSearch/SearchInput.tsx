// Libs
import React, { FC, useRef } from "react";
import { motion } from "framer-motion";
import IosClose from "react-ionicons/lib/IosClose";
import MdAdd from "react-ionicons/lib/MdAdd";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Styles
import styles from "./styles.module.scss";

// Map
import { TSearchInput } from "@components/Events/MapSearch/types";

/**
 * Map address search
 */
const SearchInput: FC<TSearchInput> = ({
  address,
  handleAddressSearch,
  isOpen,
  setIsOpen,
}) => {

  /**
   * Hooks
   */
  const containerRef = useRef(null);

  const {windowWidth, windowHeight} = useWindowSize();

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
      borderRadius: "0%",
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
      display: "block",
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
      variants={searchVariants}
      initial={true}
      animate={isOpen ? "open" : "closed"}
      className={styles.searchInput}
      ref={containerRef}
    >
      <motion.div
        onClick={() => setIsOpen(true)}
        animate={isOpen ? "open" : "closed"}
        variants={buttonVariants}
        className={styles.addBtn}
      >
        <MdAdd/>
      </motion.div>
      <motion.input
        animate={isOpen ? "open" : "closed"}
        variants={inputVariants}
        value={address}
        onChange={handleAddressSearch}
      />
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={inputVariants}
      >
        <IosClose
          fontSize="40"
          onClick={() => setIsOpen(false)}
          className={styles.closeBtn}
        />
      </motion.div>
    </motion.div>
  );
};

export { SearchInput };
