// Libs
import React, { FC, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import MdAdd from "react-ionicons/lib/MdAdd";

// Styles
import styles from "./styles.module.scss";

// Components
import { TPredictionsDropdown } from "@components/Events/PredictionsDropdown/types";

const container: Variants = {
  active: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  disabled: {},
};

const box: Variants = {
  disabled: {
    opacity: 0,
    y: 50,
  },
  active: {
    opacity: 1,
    y: 0,
  },
};

/**
 * Address predictions dropdown
 */
const PredictionsDropdown: FC<TPredictionsDropdown> = ({
  items,
  handleClick,
}) => {

  /**
   * Hooks
   */
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  /**
   * Effects
   */
  useEffect(() => {
    setIsAnimated(true);
  }, []);


  /**
   * Return JSX
   */
  return (
    <div className={styles.predictionsContainer}>
      <motion.div
        variants={container}
        animate={isAnimated ? "active" : "disabled"}
        className="container"
        initial="disabled"
      >
        {items.map((value: string) => (
          <motion.div
            key={value}
            className={styles.predictionItem}
            variants={box}
            onClick={handleClick(value)}
          >
            {value}
            <MdAdd className={styles.addIcon}/>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export { PredictionsDropdown };
