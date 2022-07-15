import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from 'react-redux';


function ProfileScreen() {
    const { user, isAuthenticated, isLoading } = useAuth0()
    const allUsers = useSelector(state => state.allUsers);
    const thisUser = allUsers.find(user => user.email === user.email)

  return (
  <div>
    {isLoading ? (<div>Loading...</div>) : isAuthenticated ?
        (<div>
            <h1>Mi perfil</h1>
            <div>
                <img src={user.picture} alt=""/>
                <p>Bienvenido a tu perfil {thisUser.name}</p>
            </div>
            <p>
                Tu correo es: {thisUser.email}
            </p>
            <p>
                Tu direccion de preferencia es: {thisUser.address}
            </p>
            <div>
                <p>Tus productos:</p>
                <ul>
                    {thisUser.products.map(product => (
                        <li>{product}</li>
                    ))}
                </ul>
            </div>
        </div>): null
    }
  </div>
  )
}

export default ProfileScreen