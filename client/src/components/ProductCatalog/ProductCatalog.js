import { useContext, useState } from "react";
import { ItemsContext } from "../Contexts/ItemsContext";
import RadioBox from "./RadioBox";
import styled from "styled-components";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const ProductCatalog = () => {
  const { itemsState } = useContext(ItemsContext);
  const [navFilter, setNavFilter] = useState();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [minMax, setMinMax] = useState({
    minimum: 0,
    maximum: 100000,
  });
  const [showInStock, setShowInStock] = useState();

  useEffect(() => {
    //Conditional statement to display items that are in stock
    const filterInStock = itemsState?.filter((item) => {
      if (showInStock === true) {
        return item.numInStock > 0;
      } else {
        return item;
      }
    });
    //conditional statement to calculate which items in the array should be displayed based on price
    const filteredArray = filterInStock?.filter((item) => {
      if (
        item.category === navFilter &&
        parseInt(item.price.slice(1)) >= minMax.minimum &&
        parseInt(item.price.slice(1)) <= minMax.maximum
      ) {
        return item;
      } else if (
        navFilter === "All" &&
        parseInt(item.price.slice(1)) >= minMax.minimum &&
        parseInt(item.price.slice(1)) <= minMax.maximum
      ) {
        return item;
      }
    });
    setPosts(filteredArray);
    setCurrentPage(1);
  }, [navFilter, itemsState, minMax, showInStock]);

  //Calculation to find which posts will be displayed. Posts per page is always set to 10
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return posts === [] ? (
    <></>
  ) : (
    <>
      <Wrapper>
          <RadioBox
            setNavFilter={setNavFilter}
            setMinMax={setMinMax}
            navFilter={navFilter}
            setShowInStock={setShowInStock}
            showInStock={showInStock}
            />

          <div>
          <Pagination
            postsPerPage={postsPerPage}
            posts={posts}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            />

          <ItemGrid>
            {currentPosts?.map((item, id) => {
              return (
                <StyledCard to={`/product/${item._id}`} key={id}>
                  <StyledText>{item.name}</StyledText>
                  <StyledThumbnail src={item.imageSrc} alt={item.name} />
                  <PriceDisplay>{item.price}</PriceDisplay>
                  {item.numInStock === 0 ? (
                    <StyledText style={{ color: "red" }}>
                      Out Of Stock
                    </StyledText>
                  ) : (
                    <StyledText></StyledText>
                  )}
                </StyledCard>
              );
            })}
          </ItemGrid>
          </div>
      </Wrapper>
    </>
  );
};

const StyledThumbnail = styled.img`
  height: auto;
  max-width: 125px;
`;

const Wrapper = styled.div`
  border-top: solid 2px lightgray;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: left;
`;

const ItemGrid = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const StyledText = styled.p`
  font-stretch: expanded;
  font-size: 10px;
  line-height: 13px;
  text-align: center;
`;

const StyledCard = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 150px;
  height: 350px;
  margin: 30px;
  padding: 20px;
  color: black;
  box-shadow: 0px 0px 10px 2px lightgray;
  border-radius: var(--border-radius);
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 100px 4px lightblue;
    transition: all ease-in 400ms;
    border: steelblue 1px solid;
  }
`;

const PriceDisplay = styled.p`
  font-size: 20px;
`;

export default ProductCatalog;
