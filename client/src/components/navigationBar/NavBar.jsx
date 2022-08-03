import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavBar = () => {
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
        <StyledNavLink exact to="/account">
          Sign-In
        </StyledNavLink>
        <StyledNavLink exact to="/cart">
          Cart
        </StyledNavLink>
        <Nav>
          {/* TODO: only show link if the user is signed-In - E.g. Wishlist etc.*/}
        </Nav>
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
  align-items: center;
  justify-content: space-between;
  width: 10%;
`;

const Logo = styled.div`
  background-position: left center, right center;
  overflow: hidden;
  padding-left: 20px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
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
