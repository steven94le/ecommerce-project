import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Pagination = ({ posts, postsPerPage, currentPage, setCurrentPage }) => {
  const [numPages, setNumPages] = useState();
  
  //Calculation to divide the array of posts into a number of pages. Math.ceil is used to round up.
  useEffect(() => {
    setNumPages(Math.ceil(posts.length / postsPerPage));
  }, [posts.length, postsPerPage]);


  //Conditional statements to handle the arrow buttons. Keeps the selection within the range of pages available.
  const handlePageUp = () => {
    if (currentPage >= 1 && currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePageDown = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return numPages === 0 ? (
    <BtnWrap></BtnWrap>
  ) : (
    <BtnWrap>
      {numPages === 0 ? (
        <></>
      ) : (
        <span style={{ paddingRight: "30px" }}>
          {currentPage} of {numPages}
        </span>
      )}
      <StyledBtn onClick={handlePageDown}>
        {currentPage === 1 ? (
          <FiArrowLeft style={{ opacity: "0.2" }} />
        ) : (
          <FiArrowLeft />
        )}
      </StyledBtn>
      <StyledBtn onClick={handlePageUp}>
        {currentPage === numPages ? (
          <FiArrowRight style={{ opacity: "0.2" }} />
        ) : (
          <FiArrowRight />
        )}
      </StyledBtn>
    </BtnWrap>
  );
};

const BtnWrap = styled.div`
  margin-right: 50px;
  display: flex;
  align-items: center;
  justify-content: right;
  height: 100px;
`;

const StyledBtn = styled.button`
  width: 50px;
  height: 30px;
  font-size: 20px;
  background-color: whitesmoke;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.1s;
  margin: 3px;
  &:active {
    box-shadow: 0px 0px 1px 1px lightgray;
  }
`;

export default Pagination;
