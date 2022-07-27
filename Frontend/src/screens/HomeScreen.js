import './HomeScreen.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts, getUsers, setUserCopy } from '../redux/actions';
import Product from '../components/Product';
import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';

function HomeScreen() {
  const products = useSelector(state => state.products);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();
  
  useEffect(() => {
    getAllProducts().then((res) => {
      dispatch(res);
    }
    );
    getUsers().then((res) => {
      dispatch(res);
    }
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(!isLoading){
      setUserCopy(user).then((res) => {
        dispatch(res);
      }
      );
      getUsers().then((res) => {
        dispatch(res);
      }
      );
    }
    // eslint-disable-next-line
  }
  , [isAuthenticated])


  return (
    <div className='homescreen'>
      <h2 className='homescreen__title'>Nuestros productos</h2>
      <div className='homescreen__products'>
        <div className='homescreen__productsBody'>
          {products.length > 0 ? products.map(product => (
            <Product product={product} />
          )) : null}
        </div>
        <Side className='homescreen__sidebar'>
            <div>
              <h1>Promociones</h1>
              <p>Todas las promos vigentes</p>
            </div>
        </Side>
      </div>

    </div>
  )
}

export default HomeScreen

const Side = styled.div`
  width: 300px;
  height: 100%;
  margin-left: 15px;
  margin-right: 15px;

  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    margin-bottom: 10px;
  }

  @media (max-width: 916px){
        display: none;
  }
`