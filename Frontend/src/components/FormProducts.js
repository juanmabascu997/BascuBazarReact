import React from 'react';
import './FormProducts.css';
import styled from 'styled-components';
import { setNewProduct } from '../redux/actions';
import { Formik, Form, Field } from 'formik';
import { Box,Button } from '@mui/material';
import { TextField} from 'formik-mui';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FormProducts({click, show}) {

    const [description, setDescription] = React.useState("")

    const sideDrawerClass = ["formproduct"]
    if (show) {
      sideDrawerClass.push("show")
    }

    
    const handleChange = (e) => {
        e.preventDefault()
        setDescription(e.target.value)
    }

  return ( show &&
    <div className={sideDrawerClass.join(" ")}>
        <Container>
            <Formik
                initialValues={ {
                    productName: '',
                    price: '',
                    countInStock: '',
                    imageURL: ''
                }}
                validate={values => {
                    const errors = {};
                    if (!values.productName) {
                        errors.productName = 'Required';
                    }

                    if (!values.price) {
                        errors.price = 'Required';
                    }
                    if (values.price <= 0) {
                        errors.price = 'El precio debe ser mayor a 0';
                    }

                    if (!values.countInStock) {
                        errors.countInStock = 'Required';
                    }
                    if (values.countInStock <= 0) {
                        errors.countInStock = 'El stock debe ser mayor a 0';
                    }

                    if (!values.imageURL) {
                        errors.imageURL = 'Required';
                    }

                    return errors;
                }}
                onSubmit={ async (values, { setSubmitting }) => {

                    let newProduct = {
                        name: values.productName,
                        price: parseInt(values.price),
                        description: description,
                        imageURL: values.imageURL,
                        countInStock: parseInt(values.countInStock)
                    };
                    if(description !== ""){
                        newProduct = await setNewProduct(newProduct)
                        console.log(newProduct)
                        setSubmitting(false);
                        newProduct.status = 200 ? toast.success("Producto agregado", {
                            position: "top-left",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true}
                            ) : toast.error("Error al agregar producto", {
                                position: "top-left",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true}
                            )
                        click();
                    }
                    else{
                        toast.error("La descripcion no puede estar vacia", {
                            position: "top-left",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true}
                        )
                    }
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
                        <h1>Agregar un producto</h1>
                        <Box margin={1}>
                            <Field
                            component={TextField}
                            type="text" 
                            name="productName"
                            label="Nombre"
                            helperText="Por favor ingrese el nombre del producto"
                            />
                        </Box>
                        <Box margin={1}>
                            <Field
                            component={TextField}
                            type="number"
                            name="price"
                            label="Precio"
                            helperText="Por favor ingrese el precio del producto"
                            />
                        </Box>
                        
                        <Box className="creation__box">
                            <textarea 
                                value={description} 
                                onChange={handleChange} 
                                className="texarea__creationnote" 
                            />             
                            {description.length > 0 && <p>Large of note {description.length}/254</p>}
                        </Box>
                        <Box margin={1}>
                            <Field
                            component={TextField}
                            type="number"
                            name="countInStock"
                            label="Stock"
                            helperText="Por favor ingrese el stock del producto"
                            />
                        </Box>
                        <Box margin={1}>
                            <Field
                            component={TextField}
                            type="text"
                            name="imageURL"
                            label="Imagen"
                            helperText="Por favor ingrese la imagen del producto"
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
                                Crear
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
                    </Form>
                )}
            </Formik>
        </Container>
    </div>
  )
}

export default FormProducts

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 20px;
    transition: all 0.3s ease-in-out;
`
