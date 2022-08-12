import React from "react";
import styled from "styled-components";
import { colors } from "../Utils/theme";

const LoaderContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 30px;
  height: 30px;
  border: 5px solid ${colors.greyLight};
  border-top: 5px solid ${colors.primary};
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const Loader = () => {
  return (
    <LoaderContainer>
      <Spinner></Spinner>
    </LoaderContainer>
  );
};

export default Loader;
