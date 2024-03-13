import React from "react";
import styled from "styled-components";

const MainContentWrapper = styled.div`
  width: 80%;
  height: 100%;
  overflow-y: auto;
`;

const MainContent = (props) => {
  return <MainContentWrapper>{props.children}</MainContentWrapper>;
};

export default MainContent;
