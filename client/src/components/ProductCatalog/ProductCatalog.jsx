import { useContext, useState } from "react"
import { ItemsContext } from "../contexts/ItemsContext"
import RadioBox from "./RadioBox";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ProductCatalog = () => {
    const {itemsState} = useContext(ItemsContext)
    const [navFilter, setNavFilter] = useState()
    const [posts, setPosts] = useState(10)
    const [minMax, setMinMax] = useState({
        minimum: 0,
        maximum: 100000,
    })

    const filteredArray = itemsState?.filter((item) => {
        if ((item.category === navFilter) && (parseInt(item.price.slice(1)) >= minMax.minimum) && (parseInt(item.price.slice(1)) <= minMax.maximum)) {
            return item;
        } else if ((navFilter === 'All') && (parseInt(item.price.slice(1)) >= minMax.minimum) && (parseInt(item.price.slice(1)) <= minMax.maximum)) {
            return item;
        }
    })

    return !itemsState ? <></> : (
        <>
            <Wrapper>
                <RadioBox setNavFilter={setNavFilter} setMinMax={setMinMax} navFilter={navFilter}  />
                <ItemGrid>
                        {
                            filteredArray?.map((item, id) => {              
                                    return ( 
                                        <StyledCard to={`/product/${item._id}`} key={id}>
                                            <StyledText>{item.name}</StyledText>
                                            <StyledThumbnail src={item.imageSrc} alt={item.name} />
                                            <PriceDisplay>{item.price}</PriceDisplay>
                                            {
                                                item.numInStock === 0 ? <StyledText style={{'color' : 'red'}}>Out Of Stock</StyledText> : <StyledText></StyledText>
                                            }
                                        </StyledCard>
                                        )
                            })
                        }
                </ItemGrid>
            </Wrapper>
        </>
    )
}

const StyledThumbnail = styled.img`
    height: auto;
    max-width: 150px;
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
    font-size: 10px;
    line-height: 13px;
    text-align: center;
`

const StyledCard = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width:175px;
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

const PriceDisplay = styled.p`
    font-size: 20px;
`

export default ProductCatalog