import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { GoogleUserContext } from "../contexts/GoogleUserContext";
import { FormsContext } from "../contexts/FormsContext";
import { EmailSignInContext } from "../contexts/EmailSignInContext";
import { useHistory } from "react-router-dom";

const CurrentUser = () => {
  const {
    setShippingForm,
    setOrderForm,
    initialShippingForm,
    initialOrderForm,
  } = useContext(FormsContext);
  const { googleUserData, setGoogleUserData } = useContext(GoogleUserContext);
  const { currentUser, setCurrentUser } = useContext(EmailSignInContext);
  const { given_name, picture } = googleUserData;

  const history = useHistory();
  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    setGoogleUserData({});
    setCurrentUser({});
    setShippingForm(initialShippingForm);
    setOrderForm(initialOrderForm);
    routeChange();
  };

  return googleUserData.name ? (
    <Wrapper>
      <StyledImg src={picture} />
      <StyledSpan>{`Howdy, ${given_name}`}</StyledSpan>
      <SignOutBtn onClick={(e) => handleSignOut(e)}>Sign Out</SignOutBtn>
    </Wrapper>
  ) : (
    <Wrapper>
      <StyledSpan>{`Howdy, ${currentUser.fullName}`}</StyledSpan>
      <SignOutBtn onClick={(e) => handleSignOut(e)}>Sign Out</SignOutBtn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 0 10px;
`;

const StyledSpan = styled.span`
  color: white;
  font-family: var(--font-heading);
  font-size: 18px;
`;

const SignOutBtn = styled.button`
  border: none;
  font-family: var(--font-heading);

  background-color: red;
  height: 50px;
  padding: 0px;
  width: 100px;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
`;

export default CurrentUser;
