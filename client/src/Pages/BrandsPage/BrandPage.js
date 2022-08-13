import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import bannerImg from "./assets/nike-athlete-watch-background.jpg";
import Loader from "../../components/Loader/Loader";

const BrandPage = () => {
  const { id } = useParams();
  const [brandItems, setBrandItems] = useState("");

  useEffect(() => {
    const fetchBrandItems = async () => {
      try {
        const res = await fetch(`/brand/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw Error(`${res.status} ${res.statusText}`);
        }
        setBrandItems(data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBrandItems();
  }, [id]);

  return (
    <Wrapper>
      <StyledTitle>{id}'s Wearables</StyledTitle>
      <BrandsWrapper>
        {brandItems && brandItems.length > 0 ? (
          brandItems.map((brandItem, index) => (
            <StyledLink
              to={`/product/${brandItem._id}`}
              key={`brand-item-${index + 1}`}
            >
              <ItemDescription>
                <img src={brandItem.imageSrc} alt="wearable tech" />
                <p>{brandItem.name}</p>
                <p>{brandItem.price}</p>
                <p>Stock: {brandItem.numInStock}</p>
              </ItemDescription>
            </StyledLink>
          ))
        ) : (
          <Loader />
        )}
      </BrandsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 90vh;
  overflow: auto;
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
`;

const StyledTitle = styled.h1`
  display: flex;
  justify-content: center;
  padding: 40px 0px;
  font-weight: bold;
  font-size: 48px;
  opacity: 0.5;
`;

const BrandsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  color: black;
  text-decoration: none;
  width: 20%;
  border: 1px lightgrey solid;
  padding: 15px 25px;
  font-size: 16px;
  margin: 15px;
  background-color: white;
  border-radius: var(--border-radius);
  text-align: center;

  img {
    height: auto;
    width: 50%;
  }

  &:hover {
    cursor: pointer;
    transition: all ease 400ms;
    opacity: 0.8;
    margin: 1px;
  }
`;

const ItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

export default BrandPage;
