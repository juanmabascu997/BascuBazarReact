import './CartScreen.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Cartitem from '../components/Cartitem';

function CartScreen() {
  const cart = useSelector(state => state.cart);
  const [cartItems, setCartItems] = useState(cart);

  useEffect(() => {
    setCartItems(cart);
  }
  , [cart]);


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
                <p>${cartItems.reduce((acc, cur) => acc + cur.price, 0)}</p>
              </div>
            ) : (
              <div className='cartscreen__container__title__total'>
                <p>Total:</p>
                <p>$0</p>
              </div>
          )}
          <div className='cartscreen__container__title__button'>
            <button>Comprar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartScreen