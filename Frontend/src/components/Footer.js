import styled from 'styled-components';
import React from 'react'
import { useSelector } from 'react-redux';

function Footer() {
    const info = useSelector(state => state.info);
    
  return (
    <FooterDiv>
        {info.length !== 0 ? info.map((item, index) => {
            return (
                <div key={index}>
                    <h1>{item.name}</h1>
                    <h3>{item.promotion}</h3>
                    <p>{item.contact}</p>
                    <p>{item.address}</p>
                    <p>{item.phone}</p>
                    <p>{item.email}</p>
                </div>
            )
        }): null}
    </FooterDiv>
  )
}

export default Footer

const FooterDiv = styled.div`
    width: 100%;
    height: 310px;
    background-color: #222222;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 1rem;
    z-index: 50;
    color: #dddddd;
`