// React
import React from "react";

// Libs
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Views
import { Home } from "./views/home";
import { About } from "./views/about";
import { Design } from "./views/design";
import { Posts } from "./views/posts";
import { Projects } from "./views/projects";
import { Events } from "./views/events";

// Components
import { Nav } from "./components/Navigation/Nav/index";
import PrivateRoute from "./components/Navigation/PrivateRoute/PrivateRoute";
import Breadcrumbs from "./components/Navigation/Breadcrumbs";

// Styles
import styles from "./styles.module.scss";

const App = () => {
  const location = useLocation();

  return (
    <div id="app" className={styles.app}>
      <Nav/>
      {/*<Breadcrumbs />*/}
      <AnimatePresence>
        <Switch location={location} key={location.pathname}>
          <Route path="/" exact component={Home}/>
          <Route path="/about" exact component={About}/>
          <Route path="/design" exact component={Design}/>
          <Route path="/posts" component={Posts}/>
          <Route path="/projects" component={Projects}/>
          <Route path="/events" component={Events}/>
          {/*<PrivateRoute path="/admin" exact component={} />*/}
        </Switch>
      </AnimatePresence>
    </div>
  );
};

export default App;
