import styled from "styled-components";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <EmptyCartStatus>
      <StyledHeader>Your cart is currently empty.</StyledHeader>
      <StyledLink to="/">Shop our wearables</StyledLink>
      <StyledLink to="/brands">Shop for a brand</StyledLink>
      <StyledLink to="/category">Shop for a category</StyledLink>
    </EmptyCartStatus>
  );
};

const EmptyCartStatus = styled.div`
  text-align: center;
`;

const StyledHeader = styled.h3`
  color: black;
  margin: 20px;
`;

const StyledLink = styled(Link)`
  background-color: black;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 3px;
  margin: 5px;
  height: 30px;
  width: 175px;
  padding: 5px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &:active {
    background: darkgrey;
  }
`;

export default EmptyCart;
