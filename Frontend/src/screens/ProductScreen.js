import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
      <div className='productscreen__left'>
        <div className='left__image'>
          <img src={product.imageURL} alt={product.name} />
        </div>
        <div className='left__info'>
          <p className='left__name'>{product.name}</p>
          <p className='left__price'>Precio: ${product.price}</p>
          <p className='left__description'>Description:{product.description}</p>
        </div>
      </div>
      <div className='productscreen__right'>
        <div className='right__info'>
          <p>
            Precio: <span>${product.price}</span> 
          </p>
          <p>
            Stock: <span>{product.countInStock}</span> 
          </p>
          <p>
            Cantidad: 
            <select>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </p>
          <p>
            <button type='button'>Añadir a carrito</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductScreen