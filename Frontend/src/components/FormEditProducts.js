import React, { useEffect } from 'react'
import './FormEditProducts.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import {updateProducts} from '../redux/actions';
import { Box, Button} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField} from 'formik-mui';
import styled from 'styled-components';
import {FiDelete} from 'react-icons/fi';
import Swal from 'sweetalert2';


function FormEditProducts({click, show}) {
    const productToEdit = useSelector(state => state.editProduct);

    const [description, setDescription] = React.useState("")
    const tags = useSelector(state => state.tags);
    const [tag, setTag] = React.useState(tags);
    const [selectedTags, setSelectedTags] = React.useState(productToEdit?.tags);

    console.log(selectedTags);
    const sideDrawerClass = ["edit"]

    if (show) {
      sideDrawerClass.push("show")
    }

    useEffect(() => {
        setDescription(productToEdit.description) 
    }
    , [productToEdit]);

    useEffect(() => {
        setTag(tags)
        setSelectedTags(productToEdit?.tags)
    } 
    , [click]);

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
    
    const handlerDeleteTag = (e) => {
        setSelectedTags(selectedTags.filter(tg => tg !== e))
        toast.error("Tag removed")
    }

  return ( show &&
    <div className={sideDrawerClass.join(" ")}>
        <Button className='closeButton' onClick={click}>
            Volver
        </Button>
        <Container>
            {productToEdit.hasOwnProperty("name") !== undefined ? 
            <Formik
            initialValues={ {
                productName: productToEdit.name,
                price: productToEdit.price,
                countInStock: productToEdit.countInStock,
                imageURL: productToEdit.imageURL
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
                    let updateProduct = {
                        name: values.productName,
                        price: parseInt(values.price, 10),
                        description: description,
                        imageURL: values.imageURL,
                        countInStock: parseInt(values.countInStock, 10),
                        tags: selectedTags
                    };
                    if(description === ""){
                        toast.error("La descripcion no puede estar vacia", {
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
                            title: `Quieres guardar los cambios de ${updateProduct.name} ?`,
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Guardar',
                            denyButtonText: `No guardar`,
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                Swal.fire('Guardado!', '', 'success')
                                await updateProducts(productToEdit._id, updateProduct)
                                setSubmitting(false);
                                click();
                            } else if (result.isDenied) {
                            Swal.fire('Cambios no guardados', '', 'info')
                            }
                        })
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
                        <h1>Editar Producto</h1>
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
                        {selectedTags?.length>0 ?<Italic>Tus tags son:</Italic> : null}
                        <TagsSelected>
                            {selectedTags.map(e => <div><p><strong>{e} <FiDelete onClick={() =>handlerDeleteTag(e)}/></strong></p></div>)}
                        </TagsSelected>
                        <Box margin={1} >
                            <div>
                            <label><strong>Selecciona los Tags del producto:</strong></label>
                            {tag?.length > 0 ? tag.map((tgs) => 
                                <div>
                                    {selectedTags.includes(tgs) ? 
                                        null :
                                        <input type="checkbox" name="tags" value={tgs} onChange={handleAddTag} />
                                    }
                                    {selectedTags.includes(tgs) ? 
                                    null:
                                    <label><strong>{tgs}</strong></label>}
                                </div>
                                )
                            : <p>No hay tags para mostrar</p>}
                            </div>
                            <hr/>
                            <div>
                            <p>O crea una nueva categoria:</p>
                            <Field
                                name="newTag"
                                component={TextField}
                                type="text"
                                label="New Tag"
                                helperText="Ingresa la categoria"
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
                                placeholder='Ingrese la descripcion del producto' 
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
            :<p>Esperando informacion</p>
            }
        </Container>
    </div>
  )
}

export default FormEditProducts

const TagsSelected = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    width: 50%;
    margin: 1rem auto;
    div {
        color: #dddddd;
        border: 1px solid #ccc;
        background-color: #222222;
        margin: 1px;
        margin-bottom: 1px;
        padding: 0.5rem;
        border-radius: 5px;
    }   
`
const FormTag = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    div {
        margin-bottom: 1px;
        padding: 0.5rem;
        border-radius: 5px;
    }
`

const Italic = styled.p`
  text-align: center;
  font-style: italic;
`

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
    padding-bottom: 20px;
`
