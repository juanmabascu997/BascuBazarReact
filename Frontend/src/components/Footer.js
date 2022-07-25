import styled from 'styled-components';
import React from 'react'
import { useSelector } from 'react-redux';
import icon from '../img/PNG 150 PX.png';

function Footer() {
    const info = useSelector(state => state.info);
    
  return (
    <FooterContainer>
        {info.length !== 0 ? info.map((item, index) => {
            return (
                <FooterDiv key={index}>
                    <div>
                        <Img src={icon} alt="icono" />
                    </div>
                    <div>
                        <p><strong>Telefono de contacto:</strong> {item.phone}</p>
                        <p><strong>Correo de contacto:</strong> {item.email}</p>
                        <p>{item.contact}</p>
                        <p>{item.address}</p> 
                        </div>
                    {/* <h3>{item.promotion}</h3>
                    
                    */}

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
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
    padding: 20px;
    div{
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    h1{
        font-weight: bold;
        margin-bottom: 10px;
    }
    p{
        font-size: 15px;
        font-weight: light;
        margin-bottom: 10px;
    }
`


const Img = styled.img`
    width: 250px;
    height: 250px;
    margin-left: 10px;
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
`