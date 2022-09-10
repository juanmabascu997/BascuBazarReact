import React, { useEffect, useRef } from 'react'
import './Payments.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, updateUserProducts } from '../../redux/actions';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { useLocation } from "react-router-dom";
import emailjs from '@emailjs/browser';


function SuccessScreen() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const allUsers = useSelector(state => state.allUsersCopy);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const query = new URLSearchParams(useLocation().search);

  const collection_id = query.get('collection_id');
  const collection_status = query.get('collection_status');
  const payment_id = query.get('payment_id');
  const payment_type = query.get('payment_type');
  const status = query.get('status');
  const merchant_order_id = query.get('merchant_order_id');
  const preference_id = query.get('preference_id');
  const site_id = query.get('site_id');
  const form = useRef();


  useEffect(() => { 
    if(!isLoading){
      const thisUser = allUsers.find(usr => usr.email === user?.email)
      const newCartData = cart.map(product => {
        return {
          ...product,
          collection_id: collection_id,
          collection_status: collection_status,
          payment_id: payment_id,
          status: status,
          payment_type: payment_type,
          merchant_order_id: merchant_order_id,
          preference_id: preference_id,
          site_id: site_id,
        }
      }
      )

      emailjs.sendForm('service_7ty0hy7', 'template_mf57mv7', form.current, 'pvcUl2Ua6bwm0tFlg')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      

      // updateUserProducts(thisUser._id, newCartData)
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
        <form ref={form} style={{"display":"none"}}>
          <input type="text" name="to_name" value={user?.given_name}/>
          <input type="text" name="reply_to" value={user?.email}/>
          <input type="text" name="message" value={payment_id}/>
        </form>
    </div>
  )
}

export default SuccessScreen