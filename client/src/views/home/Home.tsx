// Libs
import React, { FC } from "react";

// Components
import { PageContainer } from "@components/Page";

// Styles
import styles from "./styles.module.scss";

/**
 * Design Page
 */
const Home: FC<any> = () => {
  return (
    <PageContainer>
      <div>
        Home Page
      </div>
    </PageContainer>
  );
};

Home.displayName = "Home";

export { Home };
