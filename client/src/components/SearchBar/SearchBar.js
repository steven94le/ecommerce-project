import React, { useContext, useState } from "react";
import styled from "styled-components";
import { BsSearch, BsXLg } from "react-icons/bs";
import { ItemsContext } from "../Contexts/ItemsContext";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const { itemsState } = useContext(ItemsContext);
  const [filteredData, setFilteredData] = useState([]);
  const [userQuery, setUserQuery] = useState("");

  const handleFilter = (event) => {
    const itemSearched = event.target.value;
    setUserQuery(itemSearched);
    const newFilter = itemsState.filter((item) => {
      return item.name.toLowerCase().includes(itemSearched.toLowerCase());
    });

    itemSearched === "" ? setFilteredData([]) : setFilteredData(newFilter);
  };

  const clearInput = () => {
    setFilteredData([]);
    setUserQuery("");
  };
  return (
    <Container>
      <InputWrapper>
        <StyledInput
          type="text"
          placeholder="Search products..."
          onChange={handleFilter}
          value={userQuery}
        />
        <SearchIcon>
          {filteredData.length === 0 ? (
            <BsSearch />
          ) : (
            <BsXLg style={{ cursor: "pointer" }} onClick={clearInput} />
          )}
        </SearchIcon>
      </InputWrapper>
      {filteredData.length !== 0 && (
        <ResultWrapper>
          {filteredData.slice(0, 15).map((item, key) => {
            return (
              <StyledLink to={`/product/${item._id}`} target="_blank">
                <p>{item.name}</p>
              </StyledLink>
            );
          })}
        </ResultWrapper>
      )}
    </Container>
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
  width: 40vw;

  &:focus {
    outline: none;
  }
`;
const StyledLink = styled(Link)`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  color: black;

  &:hover {
    background-color: lightgrey;
  }
  p {
    margin-left: 10px;
  }
`;
const SearchIcon = styled.div`
  height: 60px;
  width: 50px;
  background-color: white;
  display: grid;
  place-items: center;
`;
const Container = styled.div``;

const InputWrapper = styled.div`
  margin-top: 10px;
  display: flex;
`;

const ResultWrapper = styled.div`
  margin-top: 5px;
  width: 42vw;
  height: 200px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default SearchBar;
