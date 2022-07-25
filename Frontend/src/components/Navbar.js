import './Navbar.css';
import {Link} from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import LoginButton from './Login';
import LogoutButton from './LogOut';
import { useAuth0 } from "@auth0/auth0-react";
import { FiUser } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";
import icon from '../img/PNG 150 PX.png';
import styled from 'styled-components';

function Navbar({click}) {
    const cart = useSelector(state => state.cart);
    const { user } = useAuth0()

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
                    <FiUser />
                    <p>Mi perfil</p>
                </Link>
            </li>
            }

            <li>
                {!user?<LoginButton/>:<LogoutButton/>}
            </li>

            <li>
                <Link to="/" className='cart__shop'>
                    <FiShoppingBag/> <span>Tienda</span>
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
