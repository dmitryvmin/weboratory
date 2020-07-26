// React
import React from "react";

// Libs
import styled from "styled-components";
import { NavLink, Switch, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Utils
import { useAuth0 } from "../../../utils/hooks/useAuth0";

// Styles
import { colors } from "../../../styles/vars";
import styles from "./styles.module.scss";
import { Button } from "@components/UI/Button";
import { useWindowSize } from "@utils/hooks/useWindowSize";
import { NavigationMenu } from "@components/Navigation/NavigationMenu";

// Styles
const Container = styled(motion.div)`
  display: flex;
  // flex-direction: ${({ animate }) =>
  animate === "closed" ? "row" : "column"};
  flex-direction: column;
  position: absolute;
  z-index: 100;
  right: 40px;
  top: 40px;
  flex-direction: row;
  justify-content: flex-end;
  box-shadow: 0 0 1px 1px #eee;
  background-color: white;
  padding: 10px;
  
  a {
    color: ${colors.$color_1};
    margin: 0 10px;
    display: flex;
    align-items: center;
    font-weight: 500;
  }
`;

const transition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const navVariants = {
  exit: { x: 100, opacity: 0, transition },
  enter: { x: 0, opacity: 1, transition: { delay: 1, ...transition } },
};

export type INavItem = {
  icon: any;
  to: string;
  label: string;
  props?: any;
}

const items: INavItem[] = [
  { icon: null, to: "/", label: "Home", props: { exact: true } },
  { icon: null, to: "/posts", label: "Posts", props: { exact: true } },
  // { icon: null, to: "/about", label: "About" },
  // { icon: null, to: "/design", label: "Design" },
  // { icon: null, to: "/projects", label: "Projects" },
  { icon: null, to: "/events", label: "Events" },
];

const Nav = () => {
  const location = useLocation();
  const { isAuthenticated, loginWithPopup, logout } = useAuth0();
  const {windowWidth} = useWindowSize();

  const renderDesktop = () => {
    return (
      <div className={styles.container}>
        <Container
          animate={location.pathname.includes("/posts/") ? "closed" : "open"}
        >
          {/*{isAuthenticated &&*/}
          {/*<NavLink to="/admin">Admin</NavLink>*/}
          {/*}*/}

          {items.map((item: INavItem) => {
            return (
              <NavLink key={item.label} to={item.to} {...item.props}>
                {item.label}
              </NavLink>
            );
          })}
          {!isAuthenticated && (
            <Button onClick={() => loginWithPopup({})}>Log in</Button>
          )}
          {isAuthenticated && <Button onClick={() => logout()}>Log out</Button>}
        </Container>
      </div>
    );
  };

  const renderMobile = () => {
    return <NavigationMenu items={items}/>;
  };

  return (windowWidth < 600)
    ? renderMobile()
    : renderDesktop();
};

export { Nav };
