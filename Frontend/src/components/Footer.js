import styled from 'styled-components';
import React from 'react'
import { useSelector } from 'react-redux';

function Footer() {
    const info = useSelector(state => state.info);
    
  return (
    <FooterContainer>
        {info.length !== 0 ? info.map((item, index) => {
            return (
                <FooterDiv key={index}>
                    <h1>{item.name}</h1>
                    {/* <h3>{item.promotion}</h3>
                    <p>{item.contact}</p>
                    <p>{item.address}</p> */}
                    <p>{item.phone}</p>
                    <p>{item.email}</p>
                </FooterDiv>
            )
        }): null}
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 40vh;
    background-color: #fafafa;
    padding: 20px;
    border-radius: 40px 40px 0px 0px ;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
`


const FooterDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
    padding: 20px;
    h1{
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    h3{
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    p{
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }
`