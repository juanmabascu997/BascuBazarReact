import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCart } from '../redux/actions';
import './Product.css';


function Product({product}) {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const addToCarrito = () => {
    if(cart){
        let repetido = cart.filter(e => e.name == product.name)
        if(repetido.length > 0){
            alert("The item is already in the cart")
        } else{
            alert("Item added to shopping cart")
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

