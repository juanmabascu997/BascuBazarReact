import './Sidebar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { FiShoppingBag } from "react-icons/fi";
import {RiUser6Line} from 'react-icons/ri';
import {AiOutlineLogout} from 'react-icons/ai';
import {AiOutlineLogin} from 'react-icons/ai';
import { FormControl, MenuItem, Select } from '@mui/material';
import {BiCategoryAlt} from 'react-icons/bi';
import { getFilterProducts } from '../redux/actions';


function Sidebar({click,show}) {
  const { user, loginWithPopup, logout } = useAuth0()
  const cart = useSelector(state => state.cart);
  const tags = useSelector(state => state.tags);
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();


  const [age, setAge] = React.useState('');

  const handleChange = (e) => {
      setAge(e.target.value);
      getFilterProducts(e.target.value, products).then((res)=>{
        dispatch(res)
    }
    )
  };

  const sideDrawerClass = ["sidedrawer"]
  if (show) {
    sideDrawerClass.push("show")
  }

  return (
    <div className={sideDrawerClass.join(" ")}>
      <ul className='sidedrawer__links' onClick={click}>
        {!user? null :
          <li>
              <Link to="/profile">
                  <RiUser6Line />
                  <span>Mi perfil</span>
              </Link>
          </li>
        }

        <li>
            {!user?<div className='sidedrawer__login' onClick={()=>loginWithPopup({returnTo:window.location.origin})}><AiOutlineLogin/><span>Iniciar sesion</span></div>:<div className='sidedrawer__login' onClick={logout}><AiOutlineLogout/><span>Cerrar sesion</span></div>}
        </li>

        <li>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Carrito <span className='sidedrawer__cartbadge'>{cart?.length}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <FiShoppingBag/><span>Tienda</span>
          </Link>
        </li>
        <li>
          <a>
            <BiCategoryAlt/><span>Filtrar: </span>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className="form__sidebar">
                <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="Categorias"
                >
                <MenuItem value="all">
                    <em>Todas</em>
                </MenuItem>
                    {tags?.map(tag => (
                        <MenuItem key={tag} value={tag}>{tag}</MenuItem>
                    ))}
                </Select>
            </FormControl>
          </a>
        </li>

      </ul>
    </div>
  )
}

export default Sidebar