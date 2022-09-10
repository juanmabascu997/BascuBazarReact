import './Navbar.css';
import {Link} from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { FiShoppingBag } from "react-icons/fi";
import icon from '../img/PNG 150 PX.png';
import styled from 'styled-components';
import { FormControl, InputLabel, MenuItem, Select,Badge } from '@mui/material';
import {RiUser6Line, RiUser6Fill} from 'react-icons/ri';
import { getFilterProducts } from '../redux/actions';
import {BsInfoCircle} from 'react-icons/bs';

function Navbar({click}) {
    const cart = useSelector(state => state.cart);
    const { user } = useAuth0()
    const tags = useSelector(state => state.tags);
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const {loginWithPopup, logout} = useAuth0()
    const [isHovering, setIsHovering] = React.useState(false);
    const [valueHovering, setValueHovering] = React.useState("");

    const [age, setAge] = React.useState('');

    const handleChange = (e) => {
        setAge(e.target.value);
        getFilterProducts(e.target.value, products).then((res)=>{
            dispatch(res)
        }
        )
    };

    const handleMouseOver = (e) => {
        setIsHovering(true);
        setValueHovering(e.target.id)
    };

    const handleMouseOut = (e) => {
        setIsHovering(false);
        setValueHovering("")
    };

  return (
    <nav className='navbar'>
        <div className='navbar__logo' href='#top'>
            <Link to="/">
                <Img src={icon} alt="icono" />
            </Link>
        </div>
        <ul className='navbar__links'>
            {!user? null :
            <li onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut} id="profile">
                <Link to="/profile" className='cart__profile' id="profile">
                    <RiUser6Fill id="profile" />
                    {isHovering && valueHovering ==="profile" && <p>PERFIL</p>}
                </Link>
            </li>
            }

            {!user?<li className='navbar__user' id="login" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
                <RiUser6Line onClick={()=>loginWithPopup({returnTo:window.location.origin})}/>
                {isHovering && valueHovering ==="login" && <p onClick={()=>loginWithPopup({returnTo:window.location.origin})}>Iniciar Sesion</p>}
            </li>:
                <li className='navbar__user'>
                    <p onClick={logout}><em>Log out</em></p>
                </li>
            }

            <Li>
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
            </Li>

            <li onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut} id="contacto">
                <a href='#contact' id="contacto" className='contacto__nav'>
                  <BsInfoCircle id="contacto"/>
                  {isHovering && valueHovering ==="contacto" && <p>NOSOTROS</p>}
                </a>
            </li>
            
            <li onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut} id="compras">
                <Link to="/" className='cart__shop' id="compras">
                    <FiShoppingBag id="compras"/>
                    {isHovering && valueHovering ==="compras" && <p>COMPRAS</p>}
                </Link>
            </li>   

            <li>
                <Link to="/cart" className='cart__link' id="cart">   
                    <Badge badgeContent={cart?.length} color="primary">
                        <i className="fas fa-shopping-cart" id="cart"></i>
                    </Badge>
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

const Li = styled.li`
    display: flex;
    text-align: center;
    justify-content: center;
    div{
        label{
            color: #222222;
            font-family: 'Bebas Neue';
            font-weight: lighter;
        }
        div{
            div{
                color: #222222;
                font-family: 'Bebas Neue';
                font-weight: lighter;

            }
        }
    }

`