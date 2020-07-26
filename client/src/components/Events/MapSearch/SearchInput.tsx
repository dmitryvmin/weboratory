// Libs
import React, { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { motion, useCycle } from "framer-motion";
import IosClose from "react-ionicons/lib/IosClose";
import MdAdd from "react-ionicons/lib/MdAdd";

// Styles
import styles from "./styles.module.scss";
import { useWindowSize } from "@utils/hooks/useWindowSize";
import { Link } from "react-router-dom";

type TSearchInput = {
  address: string;
  handleSearch(ev: SyntheticEvent<HTMLInputElement>): void;
  isOpen?: boolean;
  setIsOpen: any;
}

const SearchInput: FC<TSearchInput> = ({
  address,
  handleSearch,
  isOpen,
  setIsOpen,
}) => {

  const containerRef = useRef(null);

  const {windowWidth} = useWindowSize();

  const searchVariants = {
    closed: {
      borderRadius: "50%",
      width: 50,
      height: 50,
      x: "calc(100vw - 60px)",
      y: windowWidth < 600 ? "calc(100vh - 170px)" : "calc(100vh - 115px)",
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
        onChange={handleSearch}
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
