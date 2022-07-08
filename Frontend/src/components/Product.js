import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCart } from '../redux/actions';
import './Product.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <div className='product'>
        <img src={product.imageURL} alt=''/>          
        <div className='product__info'>
            <p className='info__name'>{product.name}</p>
            <p className='info__description'>
                {product.description}
            </p>
            <p className='info__price'>${product.price}</p>

            <Link to={`/product/${product._id}`}>
                <button className='info__button'>View more</button>
            </Link>
            <button className='info__buttonCart' onClick={addToCarrito}>Add to cart</button>
        </div>
    </div>
  )
}

export default Product

