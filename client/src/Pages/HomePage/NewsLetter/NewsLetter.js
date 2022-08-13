import styled from "styled-components";
import bannerImg from "../assets/pexels-pixabay-267394.jpg";
import EmailInput from "./EmailInput";

const NewsLetter = () => {
  return (
    <BannerWrapper>
      <BannerDetails>
        <StyledHeader>Sign-up to our newsletter!</StyledHeader>
        <EmailInput />
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

export default NewsLetter;
