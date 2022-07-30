import './CartScreen.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Cartitem from '../components/Cartitem';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUserCopy } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

function CartScreen() {
  const { user } = useAuth0()
  const cart = useSelector(state => state.cart);
  const [cartItems, setCartItems] = useState(cart);
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart);
  }
  , [cart]);


  const clickHandler = async (e) => {
    e.preventDefault();
    if(user){
      if(cart.length > 0){
        setUserCopy(user).then((res) => {
          dispatch(res);
        });
        axios.post('/payments/mercadopago/payment', {
          items: cartItems
        }).then(res => {
          window.location.href = res.data.init_point;
          // window.open(res.data.init_point, '_blank', 'noopener,noreferrer');
        }
        ).catch(err => {
          console.log(err);
        });
      } else{
        toast.error("Agrega productos al carrito", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true}
        );
      }
    } else {
      toast.error("Para comprar debes loguearte", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true}
      );
    }
    
  }

  return (
    <div className='cartscreen'>
      <div className='cartscreen__left'>
        <h1>Compras</h1>
        {cartItems?.map((product) => {
            return <div className='item__container'>
              <Cartitem product={product} />
            </div>})
        }
      </div>
      <div className='cartscreen__rigth'>
        <div className='cartscreen__info'>
          {cartItems.length !== 0 ? (
              <div className='cartscreen__container__title__total'>
                <p><strong>Monto total de compra: </strong></p>
                <p>${cartItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)}</p>
              </div>
            ) : (
              <div className='cartscreen__container__title__total'>
                <p>Total:</p>
                <p>$0</p>
              </div>
          )}
          <Button className='css-pvr4uq-MuiButtonBase-root-MuiButton-root' onClick={clickHandler}>Comprar</Button>
        </div>
      </div>
    </div>
  )
}

export default CartScreen