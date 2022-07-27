import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAProduct } from '../redux/actions';
import './ProductScreen.css';
import { addCart } from '../redux/actions';
import styled from 'styled-components';

function ProductScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  const cart = useSelector(state => state.cart);

  useEffect(() => {
   getAProduct(id).then((res) => {
      dispatch(res);
    })
    window.scrollTo(0,0)
    return () => {
      dispatch({ type: 'CLEAR_PRODUCT' });
    }
  }
  , [])

  const addToCarrito = (e) => {
    e.preventDefault();
      let repetido = cart.filter(e => e.name == product.name)
      if(repetido.length > 0){
        toast.error("El producto ya esta en el carrito", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true}
        );
      } else{
          toast.success("Producto agregado al carrito", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true}
          );
          addCart([...new Set([...cart, product])]).then((action) => {
              dispatch(action);
            });
      }
  }

  return (
    <div className='productscreen'>
      <div className='productscreen__left'>
        <div className='left__image'>
          <img src={product.imageURL} alt={product.name} />
        </div>
        <div className='left__info'>
          <p className='left__name'>{product.name}</p>
          <Tags>
            {product.tags?.map((tag, index) => {
              return <div key={index}><p><strong>{tag}</strong></p></div>
            })
            }
          </Tags>
          <p className='left__price'>Precio: ${product.price}</p>
          <p className='left__description'>Description:{product.description}</p>
        </div>
      </div>
      <div className='productscreen__right'>
        <div className='right__info'>
          <p>
            Precio: <span>${product.price}</span> 
          </p>
          <p>
            Stock: <span>{product.countInStock}</span> 
          </p>
          <p>
            Cantidad: 
            <select>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </p>
          <p>
            <Button className='css-h0uqyz-MuiButtonBase-root-MuiButton-root' onClick={addToCarrito}>Añadir a carrito</Button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductScreen

const Tags = styled.div`
    display: flex;
    flex-direction: row;
    div {
        color: #dddddd;
        border: 1px solid #ccc;
        background-color: #222222;
        margin: 1px;
        padding: 0.5rem;
        border-radius: 5px;
        margin: 5px;
    }   
`