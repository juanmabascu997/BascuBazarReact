import './HomeScreen.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../redux/actions';
import Product from '../components/Product';

function HomeScreen() {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts().then((res) => {
      dispatch(res);
    }
    );
    // eslint-disable-next-line
  }, []);


  return (
    <div className='homescreen'>
      <h2 className='homescreen__title'>HomeScreen</h2>
      <div className='homescreen__products'>
        <div className='homescreen__productsBody'>
          {products.length > 0 ? products.map(product => (
            <Product product={product} />
          )) : null}
        </div>
        <div className='homescreen__sidebar'>
          <h2>Side Bar</h2>
        </div>
      </div>

    </div>
  )
}

export default HomeScreen