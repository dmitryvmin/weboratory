// React
import React from "react";
import { Provider } from "react-redux";

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
import { Photos } from "./views/photos";
import { Posts } from "./views/posts";
import { Projects } from "./views/projects";
import { Events } from "./views/events";
import { Profile } from "./views/profile";

// Components
import { Nav } from "./components/Navigation/Nav/index";
import PrivateRoute from "./components/Navigation/PrivateRoute/PrivateRoute";
import Breadcrumbs from "./components/Navigation/Breadcrumbs";

// Styles
import classNames from "./styles.module.scss";
import { configureStore } from "@stores/globalStore/globalStore";

// Store
const globalStore = configureStore();

const App = () => {
  const location = useLocation();
  return (
    <Provider store={globalStore}>
      <div id="app" className={classNames.app}>
        <Nav/>
        {/*<Breadcrumbs />*/}
        <AnimatePresence>
          <Switch location={location} key={location.pathname}>
            <Route path="/" exact component={Home}/>
            <Route path="/about" exact component={About}/>
            <Route path="/photos" exact component={Photos}/>
            <Route path="/posts" component={Posts}/>
            <Route path="/projects" component={Projects}/>
            <Route path="/events" component={Events}/>
            <Route path="/profile" component={Profile}/>
            {/*<PrivateRoute path="/admin" exact component={} />*/}
          </Switch>
        </AnimatePresence>
      </div>
    </Provider>
  );
};

export default App;
