// YOUR_SERVICE_ID = service_ld5sl55
// YOUR_TEMPLATE_ID = template_6sfz2g9
// YOUR_USER_ID = F-jlerFc9kQmnHiSA


import styled from 'styled-components';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import icon from '../img/PNG 150 PX.png';
import emailjs from 'emailjs-com'
import {BsFacebook, BsInstagram} from 'react-icons/bs'
import { Box, Button} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField} from 'formik-mui';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';
import {HiOutlineMail, HiOutlineLocationMarker} from 'react-icons/hi'
import {BsTelephone} from 'react-icons/bs'


function Footer() {
    const info = useSelector(state => state.info);
    const [ message , setMessage] = React.useState("")
    const [ hidden, setHidden ] = React.useState(false)

    const form = useRef(null);

    const handleChange = (e) => {
        setMessage(e.target.value)
    }
    const clearState = () => setMessage("")     

    useEffect(() => {
        (window.location.pathname === "/profile" || window.location.pathname === "/adminProfile" || window.location.pathname === "/cart" )? setHidden(true) : setHidden(false)
    }, [window.location.pathname])

  return (
    hidden ? null :
    <FooterContainer id='contact'>
            <Container>
                <div className='contact__email'>
                    <div className='section-title'>
                        <h2>NOSOTROS</h2>
                        <p>
                            Si necesitas contactarnos, envianos un mensaje con tu inquietud o comentario.
                        </p>
                    </div>
                    <Formik initialValues={ {
                            name: "",
                            email: "",
                            message: ""
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.name) {
                                    errors.name = 'Requerido';
                                }
                                if (!values.email) {
                                    errors.email = 'Requerido';
                                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                    errors.email = 'Direccion de correo invalida';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {

                                console.log(form.current)
                                if(message === ""){
                                    toast.error("El mensaje no puede estar vacio", {
                                        position: "top-left",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true}
                                    )
                                }
                                else{
                                    Swal.fire({
                                        title: `Confirmas en envio?`,
                                        showDenyButton: true,
                                        showCancelButton: true,
                                        confirmButtonText: 'Si, enviar!',
                                        denyButtonText: `No, cancelar!`,
                                    }).then(async (result) => {
                                        if (result.isConfirmed) {
                                            emailjs
                                            .sendForm(
                                            'service_pd81hua', 'template_upt9d5c', form.current, 'F-jlerFc9kQmnHiSA'
                                            )
                                            .then(
                                            (result) => {
                                                clearState()
                                                setSubmitting(false);
                                                Swal.fire('Enviado!', '', 'success')
                                            },
                                            (error) => {
                                                clearState()
                                                setSubmitting(false);
                                                Swal.fire('Error en envio!', error.text, 'success')
                                            }
                                            )
                                        } else if (result.isDenied) {
                                            setSubmitting(false);
                                            Swal.fire('Mensaje descartado', '', 'info')
                                        }
                                    })
                                }
                                }
                            }
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleBlur,
                                isSubmitting,
                                handleSubmit,
                                submitForm,
                                resetForm
                                /* and other goodies */
                                }) => (
                                <Form>
                                    <Campos>
                                        <Box margin={1}>
                                            <Field
                                            component={TextField}
                                            type="text" 
                                            name="name"
                                            label="Nombre"
                                            helperText="Por favor ingrese su nombre"
                                            
                                            />
                                        </Box>
                                        <Box margin={1}>
                                            <Field
                                            component={TextField}
                                            type="email"
                                            name="email"
                                            label="Email"
                                            helperText="Por favor ingresa tu correo"
                                            
                                            />
                                        </Box>
                                    </Campos>
        
                                    <Box className="creation__box">
                                        <textarea 
                                            value={message} 
                                            onChange={handleChange} 
                                            className="texarea__creationnote"
                                            placeholder='Ingrese su mensaje' 
                                        />             
                                        {message.length > 0 && <p>Largo del mensaje: {message.length}/254</p>}
                                    </Box>
                                    <Box margin={1}>
                                        <Button
                                            sx={{margin: 1}}
                                            variant="contained"
                                            color="primary"
                                            disabled={isSubmitting}
                                            onClick={submitForm}
                                        >
                                            Enviar
                                        </Button>
                                        <Button
                                            sx={{margin: 1}}
                                            variant="contained"
                                            color="primary"
                                            disabled={isSubmitting}
                                            onClick={() => {
                                                resetForm();
                                            }}
                                        >
                                            Reset
                                        </Button>
                                    </Box>
                                    <FormHide ref={form}>
                                        <input 
                                            type="text" 
                                            id='name'
                                            name='name' 
                                            value={values.name}
                                        />
                                        <input 
                                            type="email" 
                                            id='email'
                                            name='email' 
                                            value={values.email}
                                        />
                                        <textarea 
                                            name='message'
                                            id='message'
                                            value={message}
                                        />
                                    </FormHide>
                                </Form>
                            )}
                    </Formik>
                </div>
                <div className='contact__info'>
                    <h1>Info de contacto</h1>
                    <div className='contact-item'>
                        <div className='contact-item__icon'>
                            <Img src={icon} alt='icon' />
                            <p>
                                {info[0] ? info[0].promotion : 'loading'}
                            </p>
                        </div>

                        <p>
                            <span>
                            <HiOutlineLocationMarker/>{' '}Direccion:
                            </span>
                            {info[0] ? info[0].address : 'loading'}
                        </p>
                        <p>
                            <span>
                            <BsTelephone/>{' '}Telefono:
                            </span>{' '}
                            {info[0] ? info[0].phone : 'loading'}
                        </p>
                        <p>
                            <span>
                            <HiOutlineMail/>{' '}Email:
                            </span>{' '}
                            {info[0] ? info[0].email : 'loading'}
                        </p>
                    </div>
                    <Redes>
                        <ul>
                            <li>
                                <a href={info[0] ? info[0].facebook : '/'} target="_blank" rel="noopener noreferrer">
                                    <BsFacebook/>
                                </a>
                            </li>
                            <li>
                                <a href={info[0] ? info[0].instagram : '/'} target="_blank" rel="noopener noreferrer">
                                    <BsInstagram/>
                                </a>
                            </li>
                        </ul>
                    </Redes>
                </div>
            </Container>

    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.div`
    /* display: ${(window.location.pathname === "/adminProfile" || window.location.pathname === "/profile") ? "none" : "flex"}; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    background-color: #fafafa;
    padding: 10px;
    border-radius: 40px 40px 0px 0px ;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    @media (max-width: 768px) {
        height: auto;
    }
`


const Img = styled.img`
    width: 150px;
    height: 150px;
    margin-left: 10px;
`
const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 20px;
    .contact__email{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
        padding: 20px;
        .section-title{
            display: flex;
            flex-direction: column; 
            justify-content: flex-start;
            width: 100%;
            height: 100%;
            h2{
                font-size: 2.5rem;
                font-weight: bold;
                color: #000;
                margin-bottom: 20px;
            }
            p{
                font-size: 1.4rem;
                font-weight: lighter;
                font-style: italic;
                color: #000;
                margin-bottom: 5px;
            }
        }
        form{
            .creation__box{
                textarea{
                    background-color: #fafafa;
                }
            }
        }
    }
    .contact__info{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 20px;
        border-left: #dddd solid 1px;
        margin-left: 20px;
        h1{
            font-size: 2.5rem;
            font-weight: bold;
            color: #000;
            margin-bottom: 20px;

        }
        .contact-item__icon{
            p{
                font-size: 1.2rem;
                font-weight: lighter;
                font-style: italic;
                color: #000;
                margin-bottom: 20px;
            }
        }
    }
    @media (min-width: 1253px){
        .contact__email{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .section-title{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                h2{
                    font-size: 2.8rem;
                    font-weight: bold;
                    color: #000;
                    margin-bottom: 20px;
                }
                p{
                    font-size: 1.5rem;
                    font-weight: lighter;
                    font-style: italic;
                    color: #000;
                    margin-bottom: 0px;
                }
            }
            form{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        }
        .contact__info{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }

    @media (max-width: 768px) {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .contact__email{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            padding: 20px;
            .section-title{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
            }
            form{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        }
        .contact__info{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            padding: 20px;
            border-left: none;
        }
    }
`
const FormHide = styled.form`
    display: none;
    @media (max-width: 768px) {
        display: none !important;
    }
    @media (min-width: 1253px){
        display: none !important;
    }
`

const Redes = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    ul{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        li{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            a{
                display: flex;
                width: 50px;
                height: 50px;
                margin: 0 10px;
                margin-top: 20px;
                svg{
                    width: 30px;
                    height: 30px;
                    fill: #000;
                }
            }
        }

    }
    `

    const Campos = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    
    @media (max-width: 517px) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }
    `