import React, { useState, useEffect, useContext, createContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";

const DEFAULT_REDIRECT_CALLBACK = () => {
  return window.history.replaceState(
    {},
    document.title,
    window.location.pathname,
  );
};

export const Auth0Context = createContext<any>(null);
export const useAuth0 = () => useContext(Auth0Context);

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState<Auth0Client>();
  const [loading, setLoading] = useState<boolean>(true);
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);

      setAuth0(auth0FromHook);

      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    if (!auth0Client) {
      return;
    }
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();

    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    if (!auth0Client) {
      return;
    }
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  const getAccessToken = async () => {
    if (!isAuthenticated) {
      console.log("User not authenticated.");
      return;
    }
    if (auth0Client === undefined) {
      console.log("auth0Client has not been instantiated.");
      return;
    }
    const accessToken = await auth0Client.getTokenSilently({
      scope: "read:events read:user_metadata",
    });
    if (accessToken) {
      setToken(accessToken);
    }
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p: any) =>
          auth0Client ? auth0Client.getIdTokenClaims(...p) : undefined,
        loginWithRedirect: (...p: any) =>
          auth0Client ? auth0Client.loginWithRedirect(...p) : undefined,
        getTokenSilently: (...p: any) =>
          auth0Client ? auth0Client.getTokenSilently(...p) : undefined,
        getTokenWithPopup: (...p: any) =>
          auth0Client ? auth0Client.getTokenWithPopup(...p) : undefined,
        logout: (...p: any) =>
          auth0Client ? auth0Client.logout(...p) : undefined,
        token,
        getAccessToken,
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
