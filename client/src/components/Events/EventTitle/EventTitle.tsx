// Libs
import React, { FC } from "react";
import { motion } from "framer-motion";

// Add staggering effect to the children of the container
const containerVariants = {
  before: {},
  after: { transition: { staggerChildren: 0.06 } },
};

// Variants for animating each letter
const letterVariants = {
  before: {
    opacity: 0,
    y: -10,
    transition: {
      type: "spring",
      damping: 16,
      stiffness: 200,
    },
  },
  after: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 16,
      stiffness: 200,
    },
  },
};

const EventTitle: FC<{ address: string }> = ({ address }) => {
  return (
    <div style={{ position: "absolute", zIndex: 100, width: "100vw", top: "50%" }}>
      <motion.span
        style={{
          fontWeight: "bold",
          letterSpacing: "-0.04em",
          fontSize: 14,
          color: "#000",
          display: "flex", // Set the display value to flex
          justifyContent: "center", // Center all children elements on the x axis
        }}
        variants={containerVariants}
        initial={"before"}
        animate={"after"}
      >
        {Array.from(address).map((letter, index) => (
          <motion.p
            key={index}
            style={{
              position: "relative",
              // width: "10px"
            }} // Position elements
            variants={letterVariants}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.p>
        ))}
      </motion.span>
    </div>
  );
};

export {EventTitle};
