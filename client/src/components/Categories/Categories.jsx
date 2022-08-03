import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const Categories = () => {
    //add line
    //another line
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        setLoading(true)
        const getCategories = async () => {
            const requestCategories = await fetch("/category");
            const requestJson = await requestCategories.json();
            setCategories(requestJson.data)
            setLoading(false)
        }
        getCategories()
    }, [])
    return loading ? <></> : (
        <>
        <StyledHeader>Categories</StyledHeader>
            <CategoryWrapper>
            {
                categories?.map((category, id) => {
                    return (
                    <StyledCard to={`category/${category}`} key={id}>
                        <p>{category}</p>
                    </StyledCard>
                    )
                })
            }
            </CategoryWrapper>
        </>
    )
}

const StyledHeader = styled.h1`
    color: black;
    padding: 30px;
`

const CategoryWrapper = styled.div`
    justify-content: center;
    display: flex;
    width: 100vw;
    height: 100%;
    flex-wrap: wrap;
`

const StyledCard = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 300px;
    margin: 30px;
    box-shadow:0px 0px 10px 1px lightgray;

    &:hover {
    cursor: pointer;
    background: steelblue;
    color: white;
    border-color: lightgrey;
    transition: all ease 400ms;
  }
`

export default Categories