import React from "react";
import styled, { keyframes } from "styled-components";

const Loader = () => {
  return (
    <Wrapper>
      <StyledCircle />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const Loading = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledCircle = styled.div`
  width: 128px;
  height: 128px;
  border: 16px solid;
  border-color: steelblue transparent;
  border-radius: 50%;
  animation: ${Loading} 1s linear infinite;
`;

export default Loader;
