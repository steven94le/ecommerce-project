import styled from "styled-components";
import { useHistory } from "react-router-dom";

const EmptyCart = () => {
  const history = useHistory();

  return (
    <EmptyCartStatus>
      <p>Your cart is currently empty.</p>
      {/* Change first link to all products page */}
      <StyledButton type="button" onClick={() => history.push("/")}>
        Shop our wearables
      </StyledButton>
      <StyledButton type="button" onClick={() => history.push("/brands")}>
        Shop for a brand
      </StyledButton>
      <StyledButton type="button" onClick={() => history.push("/categories")}>
        Shop for a category
      </StyledButton>
    </EmptyCartStatus>
  );
};

const EmptyCartStatus = styled.div`
  text-align: center;
`;
const StyledButton = styled.button`
  background-color: black;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 3px;
  margin: 5px;
  height: 30px;
  width: 175px;

  &:hover {
    cursor: pointer;
  }
`;

export default EmptyCart;
