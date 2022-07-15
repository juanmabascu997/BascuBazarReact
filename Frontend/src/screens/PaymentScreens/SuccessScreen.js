import React, { useEffect } from 'react'
import './Payments.css';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/actions';

function SuccessScreen() {
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
            <h1>Tu compra fue exitosa</h1>
            <h2>Puedes hacer click en el boton de abajo para volver al home</h2>
            <p>Recorda revisar tu correo donde figurara el comprobante de la compra realizada</p>
            <button onClick={clickHandler}>Home</button>
        </div>
    </div>
  )
}

export default SuccessScreen