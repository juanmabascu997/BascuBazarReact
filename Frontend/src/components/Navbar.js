import './Navbar.css';
import {Link} from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { FiShoppingBag } from "react-icons/fi";
import icon from '../img/PNG 150 PX.png';
import styled from 'styled-components';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {RiUser6Line, RiUser6Fill} from 'react-icons/ri';
import { getFilterProducts } from '../redux/actions';

function Navbar({click}) {
    const cart = useSelector(state => state.cart);
    const { user } = useAuth0()
    const tags = useSelector(state => state.tags);
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const {loginWithPopup, logout} = useAuth0()

    const [age, setAge] = React.useState('');

    const handleChange = (e) => {
        setAge(e.target.value);
        getFilterProducts(e.target.value, products).then((res)=>{
            dispatch(res)
        }
        )
    };

  return (
    <nav className='navbar'>
        <div className='navbar__logo'>
            <Link to="/">
                <Img src={icon} alt="icono" />
            </Link>
        </div>
        <ul className='navbar__links'>
            {!user? null :
            <li>
                <Link to="/profile" className='cart__profile'>
                    <RiUser6Fill />
                </Link>
            </li>
            }

            <li className='navbar__user'>
                {!user?<RiUser6Line onClick={()=>loginWithPopup({returnTo:window.location.origin})}/>:<p onClick={logout}><em>Log out</em></p>}
            </li>

            <li>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Filtros: </InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                    >
                    <MenuItem value="all">
                        <em>Todas</em>
                    </MenuItem>
                        {tags?.map(tag => (
                            <MenuItem key={tag} value={tag}>{tag}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </li>

            <li>
                <Link to="/" className='cart__shop'>
                    <FiShoppingBag/>
                </Link>
            </li>   

            <li>
                <Link to="/cart" className='cart__link'>
                    <i className="fas fa-shopping-cart"></i>
                    <span>
                        <span className='cartlogo__badge'>{cart?.length}</span>
                    </span>
                </Link>
            </li>
        </ul>
        <div className='hamburger__menu' onClick={click}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        
    </nav>
  )
}

export default Navbar

const Img = styled.img`
    width: 100%;
    height: 100%;
    margin: 0;
`
