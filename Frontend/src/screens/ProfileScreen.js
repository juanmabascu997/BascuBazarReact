import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'
import { updateUser } from '../redux/actions';
import { getUsers } from '../redux/actions';
import { Formik, Form, Field } from 'formik';
import { Box,Button } from '@mui/material';
import { TextField} from 'formik-mui';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
        window.scrollTo(0,0)

    // eslint-disable-next-line
    }
    , [])        

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
                    (<Profile>
                        <h1>Mi perfil</h1>
                        <Perfil>
                            <img src={user.picture} alt=""/>
                            <p>Bienvenido a tu perfil</p> <Italic>{thisUser.name}</Italic>
                        </Perfil>
                        <Italic>
                            Tu correo es: <strong>{thisUser.email}</strong> 
                        </Italic>
                        <Italic>
                            Tu direccion de preferencia es: <strong>{thisUser.address}</strong>
                        </Italic>
                        <Italic>
                            Tu telefono de contacto es: <strong>{thisUser.phone}</strong>
                        </Italic>
                        {thisUser.isAdmin === true ? <Admin>Eres administrador. Click <a href='/adminProfile'>aqui</a> para acceder al panel de Admin</Admin> : null}
                    </Profile>) : screen === "products" ?
                    (<Products>
                        <h1>Tus productos</h1>
                        <ul>
                            {thisUser.products.length !== 0 ? thisUser.products.map(product => (
                                <li><strong>{product.name}</strong></li>
                            )): <Italic>No tienes productos</Italic>
                            }
                        </ul>
                    </Products>) : screen === "edit" ?
                    (<div>
                        <Formik
                            initialValues={ {
                                name: userData.name,
                                email: userData.email,
                                address: userData.address,
                                phone: userData.phone
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.name) {
                                    errors.name = 'Required';
                                }
                                if (!values.email) {
                                    errors.email = 'Required';
                                }
                                if (!values.address) {
                                    errors.address = 'Required';
                                }
                                if (!values.phone) {
                                    errors.phone = 'Required';
                                }
                                return errors;
                            }}
                            onSubmit={ async (values, { setSubmitting }) => {
                                let userData = {
                                    name: values.name,
                                    email: values.email,
                                    address: values.address,
                                    phone: values.phone,
                                };
                                let userUpdate = await updateUser(thisUser._id, userData)
                                getUsers().then((res) => {
                                    dispatch(res);
                                }
                                );
                                setThisUser(userUpdate.data)

                                setSubmitting(false);
                                toast.success("Perfil modificado", {
                                    position: "bottom-rigth",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true}
                                    )
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                submitForm,
                                resetForm
                                /* and other goodies */
                            }) => (
                                <Form>
                                        <h1>Modifica tus datos</h1>
                                        <Box margin={1}>
                                            <Field
                                            component={TextField}
                                            type="text" 
                                            name="name"
                                            label="Nombre"
                                            />
                                        </Box>
                                        <Box margin={1}>
                                            <Field
                                            component={TextField}
                                            type="email"
                                            name="email"
                                            label="Email"
                                            />
                                        </Box>
                                        <Box margin={1}>
                                            <Field
                                            component={TextField}
                                            type="phone"
                                            name="phone"
                                            label="Phone"
                                            />
                                        </Box>
                                        <Box margin={1}>
                                            <Field
                                            component={TextField}
                                            type="text"
                                            name="address"
                                            label="Direccion"
                                            />
                                        </Box>
                                        <Box margin={1}>
                                            <Button
                                                sx={{margin: 1}}
                                                variant="contained"
                                                color="primary"
                                                disabled={isSubmitting}
                                                onClick={submitForm}
                                            >
                                                Guardar
                                            </Button>
                                            <Button
                                                sx={{margin: 1}}
                                                variant="contained"
                                                color="secondary"
                                                disabled={isSubmitting}
                                                onClick={() => {
                                                    resetForm();
                                                }}
                                            >
                                                Reset
                                            </Button>
                                        </Box>
                                    </Form>
                                )}
                        </Formik>
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
    align-items: flex-start;
    justify-content: center;
    height: 100vh;
    padding: 20px;
    margin-top: 100px;

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
    justify-content: center;
    width: 60%;
    background-color: #ffff;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 2px #ccc;
    border: 1px solid #ccc;
`

const Italic = styled.p`
    font-style: italic;
`

const Profile = styled.div`
    margin-left: 25px;
    margin-right: 25px;
    display: flex;
    flex-direction: column;
`    

const Products = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;
    h1 {
        text-align: center;
        margin-bottom: 20px;
    }
`

const Admin = styled.p`
    font-size: 11px;
    font-weight: lighter;
    color: #000;
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: center;
`
