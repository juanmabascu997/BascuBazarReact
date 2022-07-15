import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
    const {loginWithPopup} = useAuth0()
  return (
    <button onClick={()=>loginWithPopup({returnTo:window.location.origin})}>Login</button>
  )
}

export default LoginButton