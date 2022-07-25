import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import Backdrop from '../components/Backdrop';
import FormProducts from '../components/FormProducts';
import FormEditProducts from '../components/FormEditProducts';
import { useDispatch } from 'react-redux';
import { setEditProduct } from '../redux/actions';

function AdminScreen() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarEditOpen, setSidebarEditOpen] = useState(false);

    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.allUsersCopy);
    const allPromotions = useSelector(state => state.promotions);
    const allProducts = useSelector(state => state.products);
    const user = useSelector(state => state.userCopy);
    const thisUser = allUsers.find(usr => usr.email === user.email)
    const [ screen, setScreen ] = useState("users")

    const setPruductToEdit = (product) => {
        setEditProduct(product).then((res) => {
            dispatch(res);
        }
        )
    }


    const handlerMenu = (e) => {
        setScreen(e.target.value)
    }
  return <div>
     {thisUser?.isAdmin === false ? (<h1>No tienes permisos para ver esta pagina</h1>) :
    (<Container>
        <Left>
            <h1>Admin</h1>
            <h2>Hola {thisUser.name}!</h2>
            <div>
                <ul>
                    <li>
                        <button value="users" onClick={handlerMenu}>Usuarios</button>
                    </li>
                    <li>
                        <button value="products" onClick={handlerMenu}>Productos</button>
                    </li>
                    <li>
                        <button value="promotions" onClick={handlerMenu}>Promociones</button>
                    </li>
                    <li>
                        <button value="estadistics" onClick={handlerMenu}>Estadisticas</button>
                    </li>
                </ul>
            </div>
        </Left>
        <Perfil>
            {screen === "users" ?
            (<div>
                <h3>Usuarios</h3>
                <ul>
                    {allUsers.map(usr => {
                        return <li>{usr.name}</li>
                    }
                    )}
                </ul>
            </div>) : null}
            {screen === "products" ?
            (<div>
                <h3>Productos</h3>
                <ul>
                    {allProducts.length !== 0 ? allProducts.map(usr => {
                        return <>
                            <li>{usr.name}</li>
                            <button onClick={()=> {setPruductToEdit(usr);setSidebarEditOpen(true)}}>Editar</button>
                        </> 
                    }
                    ) : <li>No hay productos</li>}
                </ul>
                <button onClick={()=> setSidebarOpen(true)}>Agregar producto</button>
            </div>) : null}
            {screen === "promotions" ?
            (<div>
                <h3>Promociones</h3>
                <ul>
                    {allPromotions.length !== 0 ? allPromotions.map(usr => {
                        return <li>{usr.name}</li>
                    }
                    ): <li>No hay promociones</li>}
                </ul>
            </div>) : null}
            {screen === "estadistics" ?
            (<div>
                <h3>Estadisticas</h3>
                <ul>
                    <li>
                        Aca irian las estadisticas, como cuales productos se vendieron, etc.
                    </li>
                </ul>
            </div>) : null}
        </Perfil>  

        <Backdrop click={()=> {setSidebarOpen(false); setSidebarEditOpen(false)}} show={sidebarOpen || sidebarEditOpen}/>
        <FormProducts click={()=> setSidebarOpen(false)} show={sidebarOpen}/>
        <FormEditProducts close={()=> setSidebarEditOpen(false)} show={sidebarEditOpen}/>

    </Container>)
    }
  </div>
}

export default AdminScreen

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #fafafa;
    padding: 20px;
`
const Left  = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 30%;
    background-color: #fafafa;
    padding: 20px;
`
const Perfil = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;`