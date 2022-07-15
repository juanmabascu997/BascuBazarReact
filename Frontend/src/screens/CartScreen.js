import './CartScreen.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Cartitem from '../components/Cartitem';
import axios from 'axios';


function CartScreen() {
  const cart = useSelector(state => state.cart);
  const [cartItems, setCartItems] = useState(cart);
  useEffect(() => {
    setCartItems(cart);
  }
  , [cart]);


  const clickHandler = async (e) => {
    e.preventDefault();
    axios.post('/payments/mercadopago/payment', {
      items: cartItems
    }).then(res => {
      window.location.href = res.data.init_point;
      // window.open(res.data.init_point, '_blank', 'noopener,noreferrer');
    }
    ).catch(err => {
      console.log(err);
    });
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
                <p>Total:</p>
                <p>${cartItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)}</p>
              </div>
            ) : (
              <div className='cartscreen__container__title__total'>
                <p>Total:</p>
                <p>$0</p>
              </div>
          )}
          <div className='cartscreen__container__title__button'>
            <button onClick={clickHandler}>Comprar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartScreen