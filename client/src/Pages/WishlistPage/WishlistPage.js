import styled from "styled-components";
import React from "react";
import EmptyStatus from "../../components/EmptyStatus/EmptyStatus";

const WishlistPage = () => {
  return (
    <div>
      <StyledHeader>Review Your Wishlist</StyledHeader>
      <Wrapper>
        <StyledHeader>Your wishlist is currently empty.</StyledHeader>
        <EmptyStatus />
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledHeader = styled.h2`
  color: black;
  padding: 30px;
`;

export default WishlistPage;
