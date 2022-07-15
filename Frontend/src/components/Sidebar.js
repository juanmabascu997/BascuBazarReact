import './Sidebar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginButton from './Login';
import LogoutButton from './LogOut';
import { FiUser } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import { FiShoppingBag } from "react-icons/fi";

function Sidebar({click,show}) {
  const { user } = useAuth0()
  const cart = useSelector(state => state.cart);

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
                  <FiUser />
                  <span>Mi perfil</span>
              </Link>
          </li>
        }

        <li>
            {!user?<div className='sidedrawer__login'><LoginButton/><span>Iniciar sesion</span></div>:<div className='sidedrawer__login'><LogoutButton/><span>Cerrar sesion</span></div>}
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

      </ul>
    </div>
  )
}

export default Sidebar