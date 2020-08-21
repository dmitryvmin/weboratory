// Libs
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// Components
import {User} from "@components/UI/Icon";

// Utils
import { useAuth0 } from "../../../utils/hooks/useAuth0";

// Styles
import classnames from "./styles.module.scss";
import { Button } from "@components/UI/Button";
import { useWindowSize } from "@utils/hooks/useWindowSize";
import { NavigationMenu } from "@components/Navigation/NavigationMenu";

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
  // { icon: null, to: "/photos", label: "Photos", props: { exact: true } },
  // { icon: null, to: "/about", label: "About" },
  // { icon: null, to: "/design", label: "Design" },
  // { icon: null, to: "/projects", label: "Projects" },
  { icon: null, to: "/events", label: "Events" },
  {
    icon: <User />,
    to: "/profile",
    label: "Profile",
  },
];

const Nav = () => {
  const location = useLocation();
  const { isAuthenticated, loginWithPopup, logout } = useAuth0();
  const { windowWidth } = useWindowSize();

  const renderDesktop = () => {
    return (
      <div className={classnames.navigationContainer}>
        <motion.div
          className={classnames.desktopNav}
          // animate={location.pathname.includes("/posts/") ? "closed" : "open"}
        >
          {/*{isAuthenticated &&*/}
          {/*<NavLink to="/admin">Admin</NavLink>*/}
          {/*}*/}

          {items.map((item: INavItem) => {
            return (
              <NavLink key={item.label} to={item.to} {...item.props}>
                {item.icon ?? item.label}
              </NavLink>
            );
          })}
          {!isAuthenticated && (
            <Button
              className={classnames.logInBtn}
              onClick={() => loginWithPopup({})}
            >
              Log in
            </Button>
          )}
          {isAuthenticated &&
          <Button
            className={classnames.logInBtn}
            onClick={() => logout()}
          >
            Log out
          </Button>
          }
        </motion.div>
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
