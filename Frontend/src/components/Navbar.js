import './Navbar.css';
import {Link} from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';


function Navbar({click}) {
    const cart = useSelector(state => state.cart);
    
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