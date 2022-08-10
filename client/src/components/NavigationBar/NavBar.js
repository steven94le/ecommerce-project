import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { GoogleUserContext } from "../Contexts/GoogleUserContext";
import CurrentUser from "./CurrentUser";
import { EmailSignInContext } from "../Contexts/EmailSignInContext";
import { CartItemsContext } from "../Contexts/CartItemsContext";

const NavBar = () => {
  const { googleUserData } = useContext(GoogleUserContext);
  const { cartItems } = useContext(CartItemsContext);
  const { currentUser } = useContext(EmailSignInContext);

  return (
    <Wrapper>
      <LeftSide>
        <Logo>
          <NavLink exact to="/">
            <h1 style={{ color: "white" }}>Team 04</h1>
          </NavLink>
        </Logo>
        <StyledNavLink exact to="/brands">
          Brands
        </StyledNavLink>
        <StyledNavLink exact to="/category">
          Categories
        </StyledNavLink>
      </LeftSide>
      <RightSide>
        <StyledNavLink exact to="/wishlist">
          Wishlist
        </StyledNavLink>

        {googleUserData.name || currentUser.givenName ? (
          <>
            <StyledNavLink exact to="/cart">
              Your Cart ({cartItems.length})
            </StyledNavLink>
            <CurrentUser />
          </>
        ) : (
          <>
            <StyledNavLink exact to="/account">
              Sign-In
            </StyledNavLink>
            <StyledNavLink exact to="/cart">
              Cart ({cartItems.length})
            </StyledNavLink>
          </>
        )}
      </RightSide>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  background: grey;
  align-items: center;
  height: 10vh;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 20%;
`;
const RightSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 15%;
`;

const Logo = styled.div`
  background-position: left center, right center;
  overflow: hidden;
  padding-left: 20px;
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  font-family: var(--font-heading);
  font-size: 18px;
  width: fit-content;
  transition: all ease 400ms;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background: white;
    color: green;
    border-color: purple;
  }
`;

export default NavBar;
