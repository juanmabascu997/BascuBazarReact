import React, { useEffect } from 'react';
import './FormProducts.css';
import styled from 'styled-components';
import { setNewProduct } from '../redux/actions';
import { Formik, Form, Field } from 'formik';
import { Box,Button } from '@mui/material';
import { TextField} from 'formik-mui';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Widget } from "@uploadcare/react-widget";


function FormProducts({click, show}) {

    const [description, setDescription] = React.useState("")
    const tags = useSelector(state => state.tags);
    const [tag, setTag] = React.useState(tags);
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [images, setImages] = React.useState([]);
    const img = [];

    const sideDrawerClass = ["formproduct"]
    if (show) {
      sideDrawerClass.push("show")
    }

    useEffect(() => {
        return () => {
          setTag(tags)
          setSelectedTags([])
          setImages([])
        } 
    }
    , []);
    
    const handleChange = (e) => {
        e.preventDefault()
        setDescription(e.target.value)
    }

    const handleAddTag = (e) => {
        if(selectedTags.find(tg => tg === e.target.value) === undefined) {
            setSelectedTags([...selectedTags, e.target.value])
            toast.success("Tag selected")
        } 
        else {
            setSelectedTags(selectedTags.filter(tg => tg !== e.target.value))
            toast.error("Tag removed")
        }
    }
  
    const handlerCreationTag = (e) => {
        if(tag.includes(e)) {
            toast.error("Tag already exists")
        }
        if(e === "") {
            toast.error("Tag cannot be empty")
        }
        if(e !== "" && tag.includes(e) === false) {
            setTag([...tag, e])
            toast.success("Tag created")
        }
    }
    const handleImageUpload = (e) => {
        if(e.includes("~")) {
            let imag = e[e.length - 2]
            for(let i = 0; i < imag; i++) {
                img.push(`${e}nth/${i}/`)
            }
            console.log(img)
            setImages(img)
            toast.success("Imagenes cargadas")
        }
        else {
            setImages(e)
            toast.success("Imagen cargada")
        }
    }

    // ece9c674-654c-419e-9ae0-4312dd6d20b6~1/nth/0/

  return ( show &&
    <div className={sideDrawerClass.join(" ")}>
        <button className='closeButton' onClick={click}>
            Volver
        </button>
        <Container>
            <Formik
                initialValues={ {
                    productName: '',
                    price: '',
                    countInStock: '',
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
        
                    return errors;
                }}
                onSubmit={ async (values, { setSubmitting }) => {

                    let newProduct = {
                        name: values.productName,
                        price: parseInt(values.price, 10),
                        description: description,
                        imageURL: images,
                        countInStock: parseInt(values.countInStock, 10),
                        tags: selectedTags
                    };
                    console.log(newProduct)
                    if(description !== "" && images.length > 0) {
                        Swal.fire({
                            title: `Seguro de crear ${newProduct.name} ?`,
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Crear',
                            denyButtonText: `No crear`,
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                                Swal.fire('Creado!', '', 'success')
                                newProduct = await setNewProduct(newProduct)
                                setSubmitting(false);
                                click();
                            } else if (result.isDenied) {
                              Swal.fire('Articulo no creado', '', 'info')
                            }
                        })
                        
                    }
                    else{
                        if(images.length === 0) {
                            toast.error("Debe cargar una imagen de referencia", {
                                position: "top-left",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true}
                            )
                        }
                        if(description === "") {  
                        toast.error("La descripcion no puede estar vacia", {
                            position: "top-left",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true}
                        )
                        }
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
                        <hr/>
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
                            <div>
                                <label><strong>Categorias</strong></label>
                                <div>
                                    {tag.length > 0 ? tag.map((tgs) => 
                                        <div>
                                        <input type="checkbox" name={tgs} value={tgs} placeholder={tgs} onChange={handleAddTag}/>
                                        <label>{tgs}</label>
                                        </div>
                                    )
                                    : <p>No hay categorias para mostrar</p>}
                                </div>
                            </div>
                            <hr/>
                            <div>
                            <p>O crea una categoria nueva:</p>
                                <Field
                                    name="newTag"
                                    component={TextField}
                                    type="text"
                                    label="Nuevo Tag"
                                    helperText="Ingresa una categoria para el producto"
                                />
                                <Button
                                sx={{margin: 1}}
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={() => {
                                    handlerCreationTag(values.newTag);
                                    values.newTag = "";
                                }}
                                value={values.newTag}
                                >
                                Crear Tag
                                </Button>
                            </div>
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
                        {/* <Box margin={1}>
                            <Field
                            component={TextField}
                            type="text"
                            name="imageURL"
                            label="Imagen"
                            helperText="Por favor ingrese la imagen del producto"
                            />
                        </Box> */}
                        <Widget 
                            publicKey="2d33b11f1c07c8c6ffe3" 
                            dataType="image"
                            tabs='file url gdrive gphotos'
                            onChange={(info) => {
                                handleImageUpload(info.cdnUrl)
                            }}
                            multiple={true}
                        />;
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
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding: 20px;
    transition: all 0.3s ease-in-out;
    overflow-y: auto;
    padding-bottom: 30px;
`
