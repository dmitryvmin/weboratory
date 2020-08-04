// Libs
import React, { FC } from "react";
import { motion } from "framer-motion";

// Styles
import classNames from "./styles.module.scss";

// Components
import { SwitchProps } from "@components/UI/Switch/types";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const Switch: FC<SwitchProps> = ({ isOn, ...props }) => {
  const className = [
    classNames.switch,
    isOn ? classNames.on : classNames.off,
  ].join(" ");

  return (
    <motion.div animate className={className} {...props}>
      <motion.div transition={spring} animate/>
    </motion.div>
  );
};

export { Switch };
