import styled from "styled-components";
import { Link } from "react-router-dom";
import userImg from "./assets/template_picture.jpg";
import backgroundImg from "./assets/checkout_background.gif";
import React, { useContext } from "react";
import { FormsContext } from "../../components/Contexts/FormsContext";

const Confirmation = () => {
  const { orderForm } = useContext(FormsContext);
  console.log("orderForm:", orderForm);
  return (
    <Wrapper>
      <div>Order Purchased!</div>
      <div>Confirmation email sent to: {orderForm.email}</div>
      <div>Thank you for shopping at our store!</div>
      <Users>
        <User>
          <UserImg src={userImg} alt={userImg} />
          <p>Aidan</p>
        </User>
        <User>
          <UserImg src={userImg} alt={userImg} />
          <p>Shane</p>
        </User>
        <User>
          <UserImg src={userImg} alt={userImg} />
          <p>Steven</p>
        </User>
      </Users>

      <Link to="/">
        <StyledButton>Go Home</StyledButton>
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
  font-size: 36px;

  background-image: linear-gradient(
      0deg,
      rgb(220, 220, 220, 0.3),
      rgb(220, 220, 220, 0.3)
    ),
    url(${backgroundImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Users = styled.div`
  display: flex;
  justify-content: center;
  gap: 7rem;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;

  p {
    padding-top: 25px;
    text-align: center;
  }
`;

const UserImg = styled.img`
  height: 80%;
  width: auto;
  border-radius: 50%;
`;

const StyledButton = styled.button`
  color: white;
  text-align: center;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  height: 25px;
  width: 150px;
  background: linear-gradient(
    90deg,
    rgba(8, 0, 139, 1) 0%,
    rgba(0, 96, 191, 1) 100%
  );

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &:active {
    background: lightblue;
    border: lightgrey 1px solid;
  }
`;

export default Confirmation;
