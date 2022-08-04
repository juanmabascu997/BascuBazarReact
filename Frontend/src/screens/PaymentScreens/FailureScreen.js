import React, { useEffect } from 'react'
import './Payments.css';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/actions';
import { Button } from '@mui/material';

function FailureScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    clearCart().then((res) => {
        dispatch(res);
    }
    ).catch(err => {
        console.log(err);
    } 
    ); 
  },[])
  
  const clickHandler = async (e) => {
    e.preventDefault();
    window.location.href = '/';
  }


  return (
    <div className='paymentsscreen'>
      <div className='payments__body'>
          <h1>Tu compra no se realizo con exito</h1>
          <h2>Puedes hacer click en el boton de abajo para volver al home</h2>
          <p>Recorda que cualquier inconveniente nos podes escribir a nuestro correo bascubazar@gmail.com</p>
          <Button className='css-h0uqyz-MuiButtonBase-root-MuiButton-root' onClick={clickHandler}>Home</Button>
      </div>
    </div>
  )
}

export default FailureScreen