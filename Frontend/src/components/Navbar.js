import './Navbar.css';
import {Link} from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import LoginButton from './Login';
import LogoutButton from './LogOut';
import { useAuth0 } from "@auth0/auth0-react";


function Navbar({click}) {
    const cart = useSelector(state => state.cart);
    const { user } = useAuth0()

  return (
    <nav className='navbar'>
        <div className='navbar__logo'>
            <h1>Bascu Bazar</h1>
        </div>
        <ul className='navbar__links'>
            <li>
                <Link to="/cart" className='cart__link'>
                    <i className="fas fa-shopping-cart"></i>
                    <span>
                        Cart
                        <span className='cartlogo__badge'>{cart?.length}</span>
                    </span>
                </Link>
            </li>
            <li>

                <Link to="/">
                    Shop
                </Link>
            </li>
            <li>
                {!user?<LoginButton/>:<LogoutButton/>}
            </li>
            
            {!user? null :
            <li>
                <Link to="/profile">
                    Profile
                </Link>
            </li>}

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