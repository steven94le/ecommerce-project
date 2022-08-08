import styled from "styled-components";
import bannerImg from "./assets/portrait-young-fitness-woman-earphones.jpg";
const Banner = () => {
  return (
    <BannerWrapper>
      <BannerDetails>
        <h1
          style={{
            color: "black",
            textTransform: "uppercase",
            fontSize: "50px",
          }}
        >
          Luxury Wearable Collection
        </h1>
        <BtnDiv>
          <StyledBtn>MEN</StyledBtn>
          <StyledBtn>WOMEN</StyledBtn>
        </BtnDiv>
      </BannerDetails>
    </BannerWrapper>
  );
};

const BannerWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 65vh;
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

const BtnDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 15%;
  margin: 30px;
`;
const StyledBtn = styled.button`
  background-color: green;
  border-radius: 10px;
  border: none;
  padding: 20px;

  &:hover {
    background-color: white;
    color: green;
  }
`;

export default Banner;
