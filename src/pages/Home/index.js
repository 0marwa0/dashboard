import React from "react";
import SideBar from "../Sidebar";
import { CustomPageWrapper, PageContent } from "../shared/CustomPage";

const index = () => {
  return (
    <CustomPageWrapper title="Home">
      <SideBar />
      <PageContent>
        <h1>Home</h1>
      </PageContent>
    </CustomPageWrapper>
  );
};

export default index;
