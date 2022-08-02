import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Brands = () => {
  const [brandNames, setBrandNames] = useState("");

  useEffect(() => {
    const fetchBrandNames = async () => {
      try {
        const res = await fetch("/brand");
        const data = await res.json();

        if (!res.ok) {
          throw Error(`${res.status} ${res.statusText}`);
        }
        setBrandNames(data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBrandNames();
  }, []);

  return (
    <>
      <StyledTitle>Brands</StyledTitle>
      <Wrapper>
        {brandNames && brandNames.length > 0 ? (
          brandNames.map((brand, index) => (
            <StyledLink to={`/brands/${brand}`} key={`brand-${index + 1}`}>
              <div>{brand}</div>
            </StyledLink>
          ))
        ) : (
          <>Loading</>
        )}
      </Wrapper>
    </>
  );
};

const StyledTitle = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 0px;
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  width: 20%;
  text-align: center;
  border: 1px lightgrey solid;
  padding: 100px;
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

export default Brands;
