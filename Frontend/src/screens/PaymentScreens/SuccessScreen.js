import React, { useEffect } from 'react'
import './Payments.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, updateUserProducts } from '../../redux/actions';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

function SuccessScreen() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const allUsers = useSelector(state => state.allUsersCopy);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!isLoading){
      const thisUser = allUsers.find(usr => usr.email === user.email)
      updateUserProducts(thisUser._id, cart)
      clearCart().then((res) => {
        dispatch(res);
      }
      ).catch(err => {
          console.log(err);
      } 
      );
      }
    // eslint-disable-next-line
  },[isAuthenticated]);

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
            <Button className='css-h0uqyz-MuiButtonBase-root-MuiButton-root' onClick={clickHandler}>Home</Button>
        </div>
    </div>
  )
}

export default SuccessScreen