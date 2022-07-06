import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import { getAProduct } from '../redux/actions';
import './ProductScreen.css';

function ProductScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);

  useEffect(() => {
   getAProduct(id).then((res) => {
      dispatch(res);
    })
  }
  , [])
  return (
    <div className='productscreen'>
      <Product product={product}/>
    </div>
  )
}

export default ProductScreen