import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'
import { updateUser } from '../redux/actions';
import { getUsers } from '../redux/actions';

function ProfileScreen() {
    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.allUsersCopy);
    const user = useSelector(state => state.userCopy);
    const { isLoading, isAuthenticated } = useAuth0();
    const [thisUser, setThisUser] = useState(allUsers.find(usr => usr.email === user.email)) 

    const [ userData, setUserData ] = useState({
        name: thisUser.name,
        email: thisUser.email,
        image: user.image,
        phone: thisUser.phone,
        address: thisUser.address,
    })     
    
    const [ screen, setScreen ] = useState("profile")

    useEffect(() => {
        getUsers().then((res) => {
            dispatch(res);
        }
        );
    // eslint-disable-next-line
    }
    , [])        


    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async function (e) {
        e.preventDefault()
        let userUpdate = await updateUser(thisUser._id, userData)
        getUsers().then((res) => {
            dispatch(res);
        }
        );
        setThisUser(userUpdate.data)
    }

    const handlerMenu = (e) => {
        setScreen(e.target.value)
    }

  return (
  <div>
    {isLoading ? (<div>Loading...</div>) : isAuthenticated ?
        (<Container>
            <Left>
                <h1>Perfil</h1>
                <ul>
                    <li>
                        <button value="profile" onClick={handlerMenu}>Mi perfil</button>
                    </li>
                    <li>
                        <button value="edit" onClick={handlerMenu}>Editar</button>
                    </li>
                    <li>
                        <button value="products" onClick={handlerMenu}>Mis compras</button>
                    </li>
                </ul>
            </Left>
            <Center>
                {screen === "profile" ?
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
                        {thisUser.isAdmin === true ? <p>Eres administrador. Click <a href='/adminProfile'>aqui</a> para acceder al panel de Admin</p> : null}
                    </div>) : screen === "products" ?
                    (<div>
                        <p>Tus productos:</p>
                        <ul>
                            {thisUser.products.length !== 0 ? thisUser.products.map(product => (
                                <li><strong>{product.name}</strong></li>
                            )): <li>No tienes productos</li>
                            }
                        </ul>
                    </div>) : screen === "edit" ?
                    (<div>
                        <form onSubmit={handleSubmit}>
                            <label>Nombre:</label>
                            <input type="text" name="name" value={userData.name} onChange={handleChange}/>
                            <label>Email:</label>
                            <input type="text" name="email" value={userData.email} onChange={handleChange}/>
                            <label>Telefono:</label>
                            <input type="text" name="phone" value={userData.phone} onChange={handleChange}/>
                            <label>Direccion:</label>
                            <input type="text" name="address" value={userData.address} onChange={handleChange}/>
                            <button type="submit">Guardar</button>
                        </form>
                    </div>): null}
            </Center>
        </Container>): null
    }

  </div>
  )
}

export default ProfileScreen

const Container = styled.div`
    display: flex;
    flex-direction: row;
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
const Left  = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 30%;
    background-color: #fafafa;
    padding: 20px;
    border-radius: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
    ul{
        li{
            button{
                background-color: transparent;
                border: none;
                border-radius: 10px;
                padding: 10px;
                margin-bottom: 10px;
                font-size: 20px;
                font-weight: bold;
                color: #000;
                cursor: pointer;

            }
        }
    }
`
const Center = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
    background-color: #fafafa;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
`
