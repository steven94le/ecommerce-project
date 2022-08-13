import React, { useState } from "react";
import styled from "styled-components";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

const EmailInput = () => {
  const [userEmail, setUserEmail] = useState("");

  return (
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
  );
};

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

const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 25%;
  margin: 30px;
`;
export default EmailInput;
