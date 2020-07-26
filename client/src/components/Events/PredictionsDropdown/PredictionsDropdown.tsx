// Libs
import React, { FC, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

// Styles
import styles from "./styles.module.scss";

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

const PredictionsDropdown: FC<any> = ({ items, handleClick }) => {
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  if (!items || !items.length) {
    return null;
  }

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
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export { PredictionsDropdown };
