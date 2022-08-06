import { useContext, useState } from "react"
import { ItemsContext } from "../contexts/ItemsContext"
import RadioBox from "./RadioBox";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ProductCatalog = () => {
    const {itemsState} = useContext(ItemsContext)
    const [navFilter, setNavFilter] = useState()
    const [minMax, setMinMax] = useState({
        minimum: 0,
        maximum: 100000,
    })

    return !itemsState ? <></> : (
        <>
            <Wrapper>
                <RadioBox setNavFilter={setNavFilter} setMinMax={setMinMax}  />
                <ItemGrid>
                    {
                        itemsState.map((item, id) => {
                            if ((item.category === navFilter) && (parseInt(item.price.slice(1)) >= minMax.minimum) && (parseInt(item.price.slice(1)) <= minMax.maximum)) {
                                return ( 
                                    <StyledCard to={`/product/${item._id}`} key={id}>
                                        <StyledText>{item.name}</StyledText>
                                        <StyledThumbnail src={item.imageSrc} alt="" />
                                        <StyledText>{item.price}</StyledText>
                                    </StyledCard>
                                    )
                            } else if ((navFilter === 'All') && (parseInt(item.price.slice(1)) >= minMax.minimum) && (parseInt(item.price.slice(1)) <= minMax.maximum)) {
                                return (
                                    <StyledCard to={`/product/${item._id}`} key={id}>
                                        <StyledText>{item.name}</StyledText>
                                        <StyledThumbnail src={item.imageSrc} alt="" />
                                        <StyledText>{item.price}</StyledText>
                                        {item.numInStock === 0 ? <StyledText style={{'color':'red'}}>Sold Out</StyledText> : <StyledText></StyledText>}
                                    </StyledCard>
                                )
                            }
                        })
                    }
                </ItemGrid>
            </Wrapper>
        </>
    )
}

const StyledThumbnail = styled.img`
    height: 150px;
`

const Wrapper = styled.div`
    border-top: solid 2px lightgray;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: left;

`
const ItemGrid = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`

const StyledText = styled.p`
    font-stretch: expanded;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
`

const StyledCard = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 300px;
    height: 350px;
    margin: 30px;
    padding: 20px;
    color: black;
    box-shadow: 0px 0px 10px 2px lightgray;
        &:hover {
        cursor: pointer;
        box-shadow: 0px 0px 50px 4px lightgray;
        transition: all ease-in 400ms;
}
`

export default ProductCatalog