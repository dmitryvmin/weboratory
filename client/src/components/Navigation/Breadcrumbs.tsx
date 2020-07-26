// React
import React from "react";

// Libs
// import styled from "styled-components";
import { useLocation } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";

// Utils
import { useAuth0 } from "../../utils/hooks/useAuth0";

// Styles
import { colors } from "../../styles/vars";

// Styles
// const Container = styled(motion.div)`
//   display: flex;
//   // flex-direction: ${({animate}) => animate === "closed" ? "row" : "column"};
//   flex-direction: column;
//   background-color: ${colors.$color_2};
//   padding: 20px;
//   margin: 20px;
//   position: absolute;
//   z-index: 100;
//   right: 0;
//
//   a {
//     color: ${colors.$color_4};
//   }
// `;

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
