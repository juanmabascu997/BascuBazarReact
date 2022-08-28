import React from 'react'
import './Cartitem.css';
import {Link} from 'react-router-dom'
import { removeOneFromCart, setQuantity } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Cartitem({product}) {
  const dispatch = useDispatch();

  const handledSelect = (e) => {
    e.preventDefault();
    let productItem = {
      name: product.name,
      quantity: e.target.value
    }

    setQuantity(productItem).then(res => {
      dispatch(res);
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  const handledClick = (e) => {
    e.preventDefault();
    removeOneFromCart(product.name).then((action) => {
        dispatch(action);
        toast.success("Producto eliminado del carrito", {
          position: "bottom-left",
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
            <img src={product.imageURL[0]} alt={product.name} />
        </div>
        <Link to={`product/${product._id}`} className='cartitem__name'>
            <p>{product.name}</p>
        </Link>
        <p className='cartitem__price'>Precio por unidad:<strong>${product.price}</strong></p>
        <select className='cartitem__select' onChange={handledSelect} defaultValue={product.quantity}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
        </select>
        <button className='cartitem__delete' onClick={handledClick}><i className='fas fa-trash'></i></button>        
    </div>
  )
}

export default Cartitem

