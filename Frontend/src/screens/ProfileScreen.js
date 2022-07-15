import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from 'react-redux';
import styled from 'styled-components'

function ProfileScreen() {
    const { user, isAuthenticated, isLoading } = useAuth0()
    const allUsers = useSelector(state => state.allUsers);
    const thisUser = allUsers.find(usr => usr.email === user.email)

  return (
  <Container>
    {isLoading ? (<div>Loading...</div>) : isAuthenticated ?
        (<div>
            <h1>Mi perfil</h1>
            <Perfil>
                <img src={user.picture} alt=""/>
                <p>Bienvenido a tu perfil {thisUser.name}</p>
            </Perfil>
            <p>
                Tu correo es: {thisUser.email}
            </p>
            <p>
                Tu direccion de preferencia es: <strong>{thisUser.address}</strong>
            </p>
            <div>
                <p>Tus productos:</p>
                <ul>
                    {thisUser.products.map(product => (
                        <li><strong>{product}</strong></li>
                    ))}
                </ul>
            </div>
            <div>
                <button>Edita tu perfil</button>
            </div>
        </div>): null
    }

  </Container>
  )
}

export default ProfileScreen

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #fafafa;
    padding: 20px;

    h1 {
        text-align: center;
        font-size: 30px;
        margin-bottom: 20px;
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    li {
        text-align: center;
        margin-bottom: 10px;
        margin-top: 20px;
    }
`

const Perfil = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-bottom: 20px;
    }
    h1 {
        text-align: center;
        margin-bottom: 10px;
    }
`