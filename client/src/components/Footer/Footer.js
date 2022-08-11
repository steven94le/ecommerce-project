import React from "react";
import styled from "styled-components";
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiFillTwitterCircle,
  AiOutlineYoutube,
} from "react-icons/ai";
import EmailInput from "../../Pages/HomePage/NewsLetter/EmailInput";

const Footer = () => {
  return (
    <Wrapper>
      <div>
        <div
          style={{
            display: "flex",
            width: "80vw",
            alignItems: "center",
            justifyContent: "space-around",
            paddingBottom: "30px",
          }}
        >
          <div>
            <h2>Help And Information</h2>

            <h3>Shipping & Returns</h3>
            <h3>Privacy Policy</h3>
            <h3>Refund Policy</h3>
            <h3>Terms of Service</h3>
          </div>
          <h2 style={{ fontSize: "50px" }}>Team 4(04)</h2>

          <SocialIcons>
            <AiOutlineInstagram size={45} />
            <AiFillTwitterCircle size={45} />
            <AiOutlineFacebook size={45} />
            <AiOutlineYoutube size={45} />
          </SocialIcons>
          <EmailInput />
        </div>
      </div>
      <div>
        <h4>Powered by Team 04</h4>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--navbar-gradient);
  opacity: 0.8;
  align-items: center;
  height: 25vh;

  h2 {
    font-size: 20px;
    color: white;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  h3 {
    text-align: start;
    color: white;
    font-weight: lighter;
    padding: 5px 0 5px 0;
    cursor: pointer;
  }
  h4 {
    padding-bottom: 5px;
    color: white;
    font-weight: lighter;
    margin: 0;
    text-align: center;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  width: 200px;
  margin: 5px;
  padding: 0;

  cursor: pointer;
`;
export default Footer;
