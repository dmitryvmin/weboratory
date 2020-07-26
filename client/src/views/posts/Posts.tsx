// Libs
import React, { FC } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import { PageContainer } from "@components/Page";
import { PostList } from "@components/Post/PostList";

/**
 * Posts Page
 */
const Posts: FC<{}> = () => {
  return (
    <PageContainer>
      <Router>
        <Route path={["/:id", "/"]} component={PostList}/>
      </Router>
    </PageContainer>
  );
};

Posts.displayName = "Posts";

export { Posts };
