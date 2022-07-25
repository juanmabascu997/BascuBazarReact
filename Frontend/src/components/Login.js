import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components'
import { FiLogIn } from 'react-icons/fi'

function LoginButton() {
    const {loginWithPopup} = useAuth0()
  return (
    <Button onClick={()=>loginWithPopup({returnTo:window.location.origin})}><FiLogIn/></Button>
  )
}

export default LoginButton

const Button = styled.button`
    background-color: #3f4e8f;
    padding: 10px;
    border: 1px solid #3f4e8f;
    border-radius: 5px;
    transition: all 300ms;
    text-decoration: none;
    color: #fff;
    font-size: 1.2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 300ms;

    &:hover {
      transform: scale(1.1);
      border: 1px solid #dddddd;
      border-radius: 5px;
    }
`