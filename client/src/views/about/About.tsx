// React
import React, { FC } from "react";

// Components
import { PageContainer } from "@components/Page";

// Styles
// import * as styles from "./styles.module.scss";

/**
 * About Page
 */
const About: FC<{}> = () => {
  return (
    <PageContainer>
      <div>About View</div>
    </PageContainer>
  );
};

About.displayName = "About";

export { About };
