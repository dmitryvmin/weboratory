// Libs
import React, { FC, useState, useEffect, useContext, createContext, ReactNode } from "react";
import { Auth0Lock } from "auth0-lock";

// App
import { getEnv } from "@configs/env";
import { Auth0Context } from "@utils/hooks/useAuth0";

type IAuth0LockContext = any;
type IAuth0LockProvider = {
  children?: ReactNode;
};

export const Auth0LockContext = createContext<IAuth0LockContext>({} as IAuth0LockContext);

const useAuth0Lock = () => {

  const [lock, setLock] = useState<any>();

  const {getAccessToken, isAuthenticated, user, token} = useContext(Auth0Context);

  useEffect(() => {
    if (!lock) {
      return;
    }

    lock.on("authenticated", function(authResult) {

      lock.getUserInfo(authResult.accessToken, function(error, profileResult) {

        if (error) {
          // Handle error
          return;
        }

        const a = authResult.accessToken;
        const p = profileResult;

        // Update DOM
      });
    });

  }, [lock]);

  // const getClaims = async () => {
  //   if (!lock || !isAuthenticated) {
  //     return;
  //   }
  //   const uri = `https://login.auth0.com/api/v2/users/${user.sub}?fields=events&include_fields=true`;
  //   const response = await fetch(uri);
  //
  //   debugger;
  //
  // };
  //
  // useEffect(() => {
  //
  // }, [user, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    const lock = new Auth0Lock(process.env.REACT_APP_AUTH_CLIENT_ID, getEnv("AUTH_DOMAIN"));
    if (lock) {
      setLock(lock);
    }
  }, [isAuthenticated]);

  return ({
    lock,
  });
};

const Auth0LockProvider: FC<IAuth0LockProvider> = ({ children }) => {

  const auth0Lock = useAuth0Lock();

  return (
    <Auth0LockContext.Provider value={auth0Lock}>
      {children}
    </Auth0LockContext.Provider>
  );
};

export { Auth0LockProvider };