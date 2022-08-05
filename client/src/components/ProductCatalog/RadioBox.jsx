import { useEffect, useState, useContext } from "react"
import styled from "styled-components"
import { ItemsContext } from "../contexts/ItemsContext"

const RadioBox = ({ setNavFilter, setMinMax }) => {
    const [loading, setLoading] = useState(true)
    const [categoryNames, setCategoryNames] = useState()
    const {itemsState} = useContext(ItemsContext)
    const priceOptions = ['All', 'Less than $25', '$25 to $50', '$50 to $100', '$100 to $200', 'Over $200']

    useEffect(() => {
        setLoading(true)
        const getCategoryItems = async () => {
            const requestCategories = await fetch(`/category`);
            const requestJson = await requestCategories.json();
            setCategoryNames(requestJson.data)
            setNavFilter('All')
            setMinMax({minimum: 0, maximum: 100000})
            setLoading(false)
        }
        getCategoryItems()
    },[])

    const handleNav = (e) => {
        setNavFilter(e.target.value)
    }

    const handlePriceRange = (e) => {
        switch (e.target.value) {
            case "All":
                setMinMax({minimum: 0, maximum: 100000})
                break;
            case "Less than $25":
                setMinMax({minimum: 0, maximum: 25})
                break;
            case "$25 to $50":
                setMinMax({minimum: 25, maximum: 50})
                break;
            case "$50 to $100":
                setMinMax({minimum: 50, maximum: 100})
                break;
            case "$100 to $200":
                setMinMax({minimum: 100, maximum: 200})
                break;
            case "Over $200":
                setMinMax({minimum: 200, maximum: 100000})
                break;
        }
    }

return loading ? <></> : (

    <CheckBoxWrapper>
        <RadioArea>
        <FilterHeaders>Filter by Category</FilterHeaders>
            <FormPair>
                <CheckInput name="filter-by-category" type="radio" value='All' onClick={handleNav}/>
                <CheckLabel>All</CheckLabel>
            </FormPair>          
            {
                categoryNames.map((category, key) => {
                return (
                    <FormPair key={key}>
                        <CheckInput name="filter-by-category" type="radio" id={category} value={category} onClick={handleNav}/>
                        <CheckLabel htmlFor="box1">{category}</CheckLabel>
                    </FormPair>
                    )
                })
            }
        <FilterHeaders>Sort by Price</FilterHeaders>
        {
            priceOptions.map((price, key) => {
                return (
                    <FormPair key={key}>
                        <CheckInput name="nav-by-price" type="radio" value={price} id={price} onClick={handlePriceRange}/>
                        <CheckLabel>{price}</CheckLabel>
                    </FormPair>
                    )
                })
            }
        </RadioArea> 
    </CheckBoxWrapper>
)
}

const FilterHeaders = styled.p`
    align-self: center;
    margin: 20px;
    font-weight: bold;
    padding-top: 20px;
`
const CheckBoxWrapper = styled.div`
    padding: 60px;
`
const FormPair = styled.div`
    display: flex;
    align-items: center;
    width: auto;
`
const RadioArea = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: auto;
    box-shadow: 0px 0px 5px 2px lightgray;
`
const CheckInput = styled.input`
    display: inline-block;
    padding: 0px;
    margin: 0px 10px 0px 20px;
`
const CheckLabel = styled.label`
    color: black;
    font-size: 14px;
    display: inline-block;
    font-weight: bold;
`


export default RadioBox