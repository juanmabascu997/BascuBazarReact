import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCart } from '../redux/actions';
import './Product.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

function Product({product}) {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const addToCarrito = (e) => {
    e.preventDefault();
    if(cart){
        let repetido = cart.filter(e => e.name == product.name)
        if(repetido.length > 0){
          toast.error("El producto ya esta en el carrito", {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true}
          );
        } else{
            toast.success("Producto agregado al carrito", {
              position: "top-left",
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
    <ProductCard className='product'>
        <img src={product.imageURL} alt=''/>          
        <div className='product__info'>
            <h1 className='info__name'>{product.name}</h1>
            <p className='info__price'>${product.price}</p>

            <Link to={`/product/${product._id}`}>
                <button className='info__button'>View more</button>
            </Link>
            <button className='info__buttonCart' onClick={addToCarrito}>Add to cart</button>
        </div>
    </ProductCard>
  )
}

export default Product

const ProductCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    margin-bottom: 20px;
    padding: 20px;
    .product__info{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 20px;
        .info__name{
            margin-bottom: 10px;
        }
        .info__price{
            font-size: 15px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .info__button{
            background-color: #3f4e8f;
            color: #fff;
            border: none;
            border-radius: 10px;
            padding: 10px;
            margin-bottom: 10px;
            cursor: pointer;
        }
        .info__buttonCart{
            background-color: #3f4e8f;
            color: #fff;
            border: none;
            border-radius: 10px;
            padding: 10px;
            cursor: pointer;
        }
    }
    img{
        width: 100%;
        height: 200px;
        border-radius: 10px;
    }
    &:hover{
        box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
    }

`

