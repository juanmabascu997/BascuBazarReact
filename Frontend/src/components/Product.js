import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCart } from '../redux/actions';
// import './Product.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { Button } from '@mui/material';

function Product({product}) {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const addToCarrito = (e) => {
    e.preventDefault();
    if(cart){
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
  }

  return (
    <ProductCard>
        <div className='product__img'>
          <img src={product.imageURL[0]} alt=''/>          
        </div>
        <div className='product__info'>
            <div className='ContainerInfo'>
              <h2>{product.name}</h2>
              <p className='info__price'>Precio por unidad: ${product.price}</p>
            </div>
            <div className='ContainerButton'>
              <Link to={`/product/${product._id}`}>
                  Ver más
              </Link>
              <Button className='css-h0uqyz-MuiButtonBase-root-MuiButton-root' onClick={addToCarrito}><i className="fas fa-shopping-cart"></i></Button>
            </div>
        </div>
    </ProductCard>
  )
}

export default Product

const ProductCard = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 0.6fr);
  grid-auto-columns: auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
  align-items: end;
  align-content: space-between;
  padding: 20px;
  .product__img{
    img{
      border-radius: 10px;
    }
  }
  .product__info{
    .ContainerInfo{
      margin-bottom: 20px;
    }
    .ContainerButton{

      a{
        text-decoration: none;
      }
    }
  }

  &:hover{
      box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
  }
`
