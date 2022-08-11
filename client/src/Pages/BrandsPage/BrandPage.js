import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
    <>
      <StyledTitle>{id}'s Wearables</StyledTitle>
      <Wrapper>
        {brandItems && brandItems.length > 0 ? (
          brandItems.map((brandItem, index) => (
            <StyledLink
              to={`/product/${brandItem._id}`}
              key={`brand-item-${index + 1}`}
            >
              <img src={brandItem.imageSrc} alt="wearable tech" />
              <ItemDescription>
                <div>{brandItem.name}</div>
                <div>{brandItem.price}</div>
                <div>Stock: {brandItem.numInStock}</div>
              </ItemDescription>
            </StyledLink>
          ))
        ) : (
          <Loader />
        )}
      </Wrapper>
    </>
  );
};

const StyledTitle = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 0 20px 0px;
  font-weight: bold;
  font-size: 48px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  color: black;
  text-decoration: none;
  width: 20%;
  border: 1px lightgrey solid;
  padding: 50px;
  font-size: 16px;
  margin: 15px;

  &:hover {
    cursor: pointer;
    background: steelblue;
    color: white;
    border-color: lightgrey;
    transition: all ease 400ms;
  }
`;

const ItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  top: 20px;
  right: 40px;
  width: 250px;
  height: 100%;

  div {
    padding-top: 5px;
  }
`;

export default BrandPage;
