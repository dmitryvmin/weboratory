// React
import React from "react";

// Libs
import { useLocation } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";

// Utils
import { useAuth0 } from "../../utils/hooks/useAuth0";

const transition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const navVariants = {
  exit: { x: 100, opacity: 0, transition },
  enter: { x: 0, opacity: 1, transition: { delay: 1, ...transition } },
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathsArray = location.pathname.split("/").filter((p) => p !== "");

  return <div/>;
};

export default Breadcrumbs;
