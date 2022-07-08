import React from 'react'
import './Cartitem.css';
import {Link} from 'react-router-dom'
import { removeOneFromCart } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Cartitem({product}) {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();


  const handledClick = (e) => {
    removeOneFromCart(e).then((action) => {
        dispatch(action);
        toast.success("Producto eliminado del carrito", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true}
          );
    }
    )
       
    // eslint-disable-next-line
  }

  return (
    <div className='cartitem'>
        <div className='cartitem__image'>
            <img src={product.imageURL} alt={product.name} />
        </div>
        <Link to={`product/${product._id}`} className='cartitem__name'>
            <p>{product.name}</p>
        </Link>
        <p className='cartitem__price'>Precio por unidad:<strong>${product.price}</strong></p>
        <select className='cartitem__select'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
        </select>
        <button className='cartitem__delete' onClick={()=>handledClick(product.name)}><i className='fas fa-trash'></i></button>        
    </div>
  )
}

export default Cartitem

