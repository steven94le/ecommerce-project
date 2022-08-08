import styled from "styled-components";
import { Link } from "react-router-dom";

const Confirmation = () => {
  return (
    <Wrapper>
      <div>Order Purchased!</div>
      <div>Thank you for shopping at our store!</div>
      <Link to="/">
        <button>Go to home page</button>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 90%;
  gap: 5rem;
`;

export default Confirmation;
