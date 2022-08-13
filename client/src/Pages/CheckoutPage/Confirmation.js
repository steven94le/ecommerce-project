import styled from "styled-components";
import { Link } from "react-router-dom";
import userImg from "./assets/template_picture.jpg";
import backgroundImg from "./assets/checkout_background.gif";
import React, { useContext } from "react";
import { FormsContext } from "../../components/Contexts/FormsContext";

const Confirmation = ({ isBillingToggled }) => {
  const { orderForm, shippingForm, billingForm } = useContext(FormsContext);
  const shippingFormArr = Object.entries(shippingForm);
  const billingFormArr = Object.entries(billingForm);
  const { givenName, email } = orderForm;

  const date = new Date();
  const orderDate =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

  return (
    <Wrapper>
      <LeftSide>
        <OrderInfo>
          <h1>Order Received</h1>
          <hr />
          <p>Thank you for shopping with us, {givenName || "XX"}!</p>
          <p>Order placed on: {orderDate}</p>
          <p>Confirmation email sent to: {email || "XX"}</p>
        </OrderInfo>
        <OrderInfo>
          <h1>Shipping info</h1>
          <hr />
          {shippingFormArr.map((formField, index) => (
            <p key={`${formField} - ${index + 1}`}>
              {formField[0]}: {formField[1]}
            </p>
          ))}
        </OrderInfo>
        <OrderInfo>
          <h1>Billing info</h1>
          <hr />
          {isBillingToggled ? (
            <>
              {shippingFormArr.map((formField, index) => (
                <p key={`${formField} - ${index + 1}`}>
                  {formField[0]}: {formField[1]}
                </p>
              ))}
            </>
          ) : (
            <>
              {billingFormArr.map((formField, index) => (
                <p>
                  {formField[0]}: {formField[1]}
                </p>
              ))}
            </>
          )}
        </OrderInfo>
      </LeftSide>
      <RightSide>
        <Link to="/">
          <StyledButton>Shop For More!</StyledButton>
        </Link>
        <ImgArea>
          <img src={backgroundImg} alt={backgroundImg} />
        </ImgArea>
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
      </RightSide>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  gap: 5rem;
  margin: 20px 100px;
  font-size: 15px;

  > div {
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 80vh;
  }
`;

const LeftSide = styled.div`
  display: flex;
  gap: 3rem;
`;

const OrderInfo = styled.div`
  border: 1px grey solid;
  border-radius: 10px;
  height: 220px;
  padding: 10px;

  > p:first-child {
    font-weight: bold;
  }

  > p {
    padding-bottom: 5px;
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
`;

const StyledButton = styled.button`
  color: white;
  text-align: center;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  height: 25px;
  width: 150px;
  margin-top: 20px;
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

const ImgArea = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 75%;
  }
`;

const Users = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
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
  height: 50%;
  width: auto;
  border-radius: 50%;
`;

export default Confirmation;
