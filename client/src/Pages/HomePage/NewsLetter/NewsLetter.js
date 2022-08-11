import React, { useState } from "react";
import styled from "styled-components";
import bannerImg from "../assets/pexels-pixabay-267394.jpg";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

const NewsLetter = () => {
  const [userEmail, setUserEmail] = useState("");

  return (
    <BannerWrapper>
      <BannerDetails>
        <StyledHeader>Sign-up to our newsletter!</StyledHeader>
        <BtnDiv>
          <StyledInput
            type="email"
            placeholder="Enter E-mail Address..."
            value={userEmail}
            onChange={(e) => {
              e.preventDefault();
              setUserEmail(e.target.value);
            }}
          ></StyledInput>
          <SearchIcon>
            <BsFillArrowRightSquareFill
              onClick={(e) => {
                e.preventDefault();
                setUserEmail("");
              }}
            />
          </SearchIcon>
        </BtnDiv>
      </BannerDetails>
    </BannerWrapper>
  );
};

const BannerWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 45vh;
  overflow: hidden;
  position: relative;
  background-image: linear-gradient(
      0deg,
      rgb(220, 220, 220, 0.3),
      rgb(220, 220, 220, 0.3)
    ),
    url(${bannerImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  background-color: white;
  border: 0;
  border-radius: 2px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  font-size: 18px;
  padding: 15px;
  height: 30px;
  width: 80vw;

  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled.div`
  height: 60px;
  width: 70px;
  background-color: white;
  display: grid;
  place-items: center;

  &:hover {
    cursor: pointer;
  }
`;
const BannerDetails = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  z-index: 1;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledHeader = styled.h1`
  color: white;
  text-transform: uppercase;
  font-size: 50px;
  opacity: 0.9;
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 25%;
  margin: 30px;
`;

export default NewsLetter;
