import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import Backdrop from '../components/Backdrop';
import FormProducts from '../components/FormProducts';
import FormEditProducts from '../components/FormEditProducts';
import { useDispatch } from 'react-redux';
import { setEditProduct, deleteProduct, getAllProducts } from '../redux/actions';
import { BiEdit } from 'react-icons/bi';
import { Button } from '@mui/material';
import {BiArchiveIn} from 'react-icons/bi';
import Swal from 'sweetalert2';

function AdminScreen() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarEditOpen, setSidebarEditOpen] = useState(false);


    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.allUsersCopy);
    const allPromotions = useSelector(state => state.promotions);
    const allActiveProducts = useSelector(state => state.products);
    const allDisableProducts = useSelector(state => state.disableProducts);
    const user = useSelector(state => state.userCopy);
    const thisUser = allUsers.find(usr => usr.email === user.email)

    const [ screen, setScreen ] = useState("users")
    const [ disableProducts, seeDisableProducts ] = useState("active")

    useEffect(() => {
        window.scrollTo(0,0)
    }
    , [])
    
    const archiveProduct = (product) => {
        Swal.fire({
            title: `Quieres cambiar el estado de ${product.name} ?`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            denyButtonText: `No guardar`,
          }).then(async (result) => {
            if (result.isConfirmed) {
              Swal.fire('Guardado!', '', 'success')
              await deleteProduct(product._id)
                getAllProducts().then(res => {
                    dispatch(res)
                }
                )
            } else if (result.isDenied) {
              Swal.fire('Cambio no guardado', '', 'info')
            }
          })
    }



    const setPruductToEdit = (product) => {
        setEditProduct(product).then((res) => {
            dispatch(res);
        }
        )
    }

    const handledChange = (e) => {
        const { value } = e.target;
        seeDisableProducts(value)
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
        <Center>
            {screen === "users" ?
            (<div>
                <h1>Usuarios</h1>
                <Lista>
                    {allUsers.map(usr => {
                        return <li>{usr.name}</li>
                    }
                    )}
                </Lista>
            </div>) : null}
            {screen === "products" ?
            (<Products>
                <h1>Productos</h1>
                <Lista>
                    <select onChange={handledChange}>
                        <option value="active">Activos</option>
                        <option value="disabled">Desactivados</option>
                    </select>
                    {disableProducts === "disabled"? allDisableProducts?.map(usr => {
                            return <li>
                                <label>{usr.name}</label>
                                <div>
                                    <button onClick={()=>archiveProduct(usr)}><BiArchiveIn/></button>
                                </div>
                            </li>
                        }) : allActiveProducts.length !== 0 ? allActiveProducts.map(usr => {
                        return <li>
                            <label>{usr.name}</label>
                            <div>
                                <button onClick={()=> {setPruductToEdit(usr);setSidebarEditOpen(true)}}><BiEdit/></button>
                                <button onClick={()=>archiveProduct(usr)}><BiArchiveIn/></button>
                            </div>
                        </li> 
                    }) : <li>No hay productos</li>}
                </Lista>
                <Button className='css-pvr4uq-MuiButtonBase-root-MuiButton-root' onClick={()=> setSidebarOpen(true)}>Agregar producto</Button>
            </Products>) : null}
            {screen === "promotions" ?
            (<div>
                <h1>Promociones</h1>
                <ul>
                    {allPromotions.length !== 0 ? allPromotions.map(usr => {
                        return <li>{usr.name}</li>
                    }
                    ): <li>No hay promociones</li>}
                </ul>
            </div>) : null}
            {screen === "estadistics" ?
            (<div>
                <h1>Estadisticas</h1>
                <ul>
                    <li>
                        Aca irian las estadisticas, como cuales productos se vendieron, etc.
                    </li>
                </ul>
            </div>) : null}
        </Center>  

        <Backdrop click={()=> {setSidebarOpen(false); setSidebarEditOpen(false)}} show={sidebarOpen || sidebarEditOpen}/>
        <FormProducts click={()=> setSidebarOpen(false)} show={sidebarOpen}/>
        <FormEditProducts click={()=> setSidebarEditOpen(false)} show={sidebarEditOpen}/>

    </Container>)
    }
  </div>
}

export default AdminScreen

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    height: 100vh;
    padding: 20px;
    margin-top: 100px;
    margin-bottom: 100px;
    h1 {
        text-align: center;
        font-size: 30px;
        margin-bottom: 5px;
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    li {
        text-align: center;
        margin-bottom: 10px;
        margin-top: 5px;
        border-bottom: 1px solid #ccc;
        font-size: 10px;
        font-weight: lighter;
        &:first-child{
            margin-top: 15px;
        }
    }
`

const Left  = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    background-color: #ffff;
    padding: 20px;
    border-radius: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 2px #ccc;
    border: 1px solid #ccc;
    ul{
        li{
            button{
                background-color: transparent;
                border: none;
                border-radius: 10px;
                padding: 10px;
                margin-bottom: 10px;
                font-size: 15px;
                font-weight: lighter;
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
    justify-content: flex-start;
    width: 60%;
    height: calc(100vh - 130px);
    background-color: #ffff;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 2px #ccc;
    border: 1px solid #ccc;
    overflow-y: auto;

`

const Italic = styled.p`
    font-style: italic;
`

const Lista = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    li{
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        margin-top: 10px;
        font-size: 12px;

        div{
            display: flex;
            align-items: center;
            justify-content: center;

            button{
                display: flex;
                background-color: #FF7701;
                border: none;
                border-radius: 10px;
                padding: 5px;
                font-size: 15px;
                font-weight: lighter;
                color: #000;
                cursor: pointer;
            }
        }

        &:first-child{
            margin-top: 15px;
        }
    }
`


const Products = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;
    h1 {
        text-align: center;
        margin-bottom: 20px;
    }

`