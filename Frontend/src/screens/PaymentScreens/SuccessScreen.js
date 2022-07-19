import React, { useEffect, useState } from 'react'
import './Payments.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, updateProducts } from '../../redux/actions';

function SuccessScreen() {

  const dispatch = useDispatch();
  const allUsers = useSelector(state => state.allUsersCopy);
  const user = useSelector(state => state.userCopy);
  const cart = useSelector(state => state.cart);
  const [thisUser, setThisUser] =useState(allUsers.find(usr => usr.email === user.email)) 

  useEffect(() => {
    return () => {
      updateProducts(thisUser._id, cart).then((res) => {
        dispatch(res);
      }
      ).catch(err => {
          console.log(err);
      } 
      ); 
  
      clearCart().then((res) => {
          dispatch(res);
      }
      ).catch(err => {
          console.log(err);
      } 
      ); }
  // eslint-disable-next-line
  },[])

  const clickHandler = async (e) => {
    e.preventDefault();
    window.location.href = '/';
  }


  return (
    <div className='paymentsscreen'>
        <div className='payments__body'>
            <h1>Tu compra fue exitosa</h1>
            <h2>Puedes hacer click en el boton de abajo para volver al home</h2>
            <p>Recorda revisar tu correo donde figurara el comprobante de la compra realizada</p>
            <button onClick={clickHandler}>Home</button>
        </div>
    </div>
  )
}

export default SuccessScreen