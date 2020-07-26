// Libs
import React, { FC, ReactNode } from "react";
import { motion } from "framer-motion";

// Styles
import styles from "./styles.module.scss";

const pageTransition = {
  type: "tween",
  // ease: "anticipate",
  duration: 0.2,
};

const pageVariants = {
  initial: {
    opacity: 0,
    y: 100,
    scale: 0.9,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
  },
};

type TPage = {
  children: ReactNode;
  color?: string;
};

const PageContainer: FC<TPage> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={styles.pageContainer}
    >
      {children}
    </motion.div>
  );
};

export { PageContainer };
