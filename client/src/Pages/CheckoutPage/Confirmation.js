import styled from "styled-components";
import { Link } from "react-router-dom";
import userImg1 from "./assets/user_img1.jpeg";
import userImg2 from "./assets/user_img2.jpeg";
import userImg3 from "./assets/user_img3.jpeg";
import backgroundImg from "./assets/checkout_background.gif";
import React, { useContext } from "react";
import { FormsContext } from "../../components/Contexts/FormsContext";

const Confirmation = () => {
  const { orderForm, shippingForm, billingForm } = useContext(FormsContext);
  const shippingFormArr = Object.entries(shippingForm);
  const billingFormArr = Object.entries(billingForm);
  const { email } = orderForm;
  const { givenName } = shippingForm;

  const date = new Date();
  const orderDate =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

  const formFieldsToDisplay = {
    givenName: "First Name",
    surname: "Last Name",
    address: "Address",
    phoneNumber: "Phone Number",
    city: "City",
    province: "Province",
    country: "Country",
    postalCode: "Postal Code",
  };

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
            <div key={`${formField}-${index + 1}`}>
              <p>
                {formFieldsToDisplay[formField[0]]}: {formField[1]}
              </p>
            </div>
          ))}
        </OrderInfo>
        <OrderInfo>
          <h1>Billing info</h1>
          <hr />
          {billingFormArr.map((formField, index) => (
            <div key={`${formField}-${index + 1}`}>
              <p>
                {formFieldsToDisplay[formField[0]]}: {formField[1]}
              </p>
            </div>
          ))}
        </OrderInfo>
      </LeftSide>
      <RightSide>
        <Link to="/">
          <StyledButton>Continue Shopping</StyledButton>
        </Link>
        <ImgArea>
          <img src={backgroundImg} alt={backgroundImg} />
        </ImgArea>
        <Users>
          <User>
            <UserImg src={userImg1} alt={userImg1} />
            <p>Aidan</p>
          </User>
          <User>
            <UserImg src={userImg2} alt={userImg2} />
            <p>Shane</p>
          </User>
          <User>
            <UserImg src={userImg3} alt={userImg3} />
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
  height: 90vh;
  gap: 5rem;
  padding: 20px 100px;
  font-size: 15px;
  background-color: #f2f2f2;

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

  > div:first-child > p {
    padding: 12px 0px;
  }
`;

const OrderInfo = styled.div`
  border: 1px grey solid;
  border-radius: 10px;
  height: 220px;
  padding: 10px;
  box-shadow: 0px 5px 5px 1px #ccc;
  background-color: white;

  > p:first-child {
    font-weight: bold;
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
  height: 35px;
  width: 175px;
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
  height: 75px;
  width: 75px;
  border-radius: 50%;
`;

export default Confirmation;
