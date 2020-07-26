// Libs
import React, { useEffect } from "react";
import { Route } from "react-router-dom";

// Hooks
import { useAuth0 } from "../../../utils/hooks/useAuth0";

const PrivateRoute = ({ component: Component, path, ...rest }: any) => {
  const { loading, isAuthenticated, loginWithPopup } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithPopup({
        appState: { targetUrl: window.location.pathname },
      });
    };
    fn();
  }, [
    loading,
    isAuthenticated,
    loginWithPopup,
    path,
  ]);

  const render = (props: any) => {
    return isAuthenticated === true ? <Component {...props} /> : null;
  };

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
