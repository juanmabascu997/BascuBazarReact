import './App.css';
import SmoothScroll from "smooth-scroll";
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import CartScreen from './screens/CartScreen.js';
import Backdrop from './components/Backdrop';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInformation, getUsers, setUser, setUserCopy } from './redux/actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PendingScreen from './screens/PaymentScreens/PendingScreen';
import SuccessScreen from './screens/PaymentScreens/SuccessScreen';
import FailureScreen from './screens/PaymentScreens/FailureScreen';
import ProfileScreen from './screens/ProfileScreen';
import { useAuth0 } from "@auth0/auth0-react";
import AdminScreen from './screens/AdminScreen';
import Wave from 'react-wavify'

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth0();
  const allUsers = useSelector(state => state.allUsers);
  const dispatch = useDispatch()

  useEffect(() => {
    getInformation().then((res) => {
      dispatch(res);
    }
    );
   
  // eslint-disable-next-line
  }
  , [])

  useEffect(() => {
    if (allUsers.length > 0) {
      if( allUsers.find(e => e.email === user.email) === undefined ){
        setUser(user).then((res) => {
          dispatch(res);
        }
        );
        setUserCopy(user).then((res) => {
          dispatch(res);
        }
        );
        getUsers().then((res) => {
          dispatch(res);
        }
        );
        console.log("User added");
      } else {
        console.log("User was already in the database");
      }
    } else {
      if(user){
        setUser(user).then((res) => {
            dispatch(res);
        }
        );
        setUserCopy(user).then((res) => {
          dispatch(res);
        }
        );
        getUsers().then((res) => {
          dispatch(res);
        }
        );
        console.log("User is logged in for first time");
      }
     }
  // eslint-disable-next-line
  }
  , [user])

  return (
    <Router>  
        <Navbar click={()=> setSidebarOpen(true)} />
        <Backdrop click={()=> setSidebarOpen(false)} show={sidebarOpen}/>
        <Sidebar click={()=> setSidebarOpen(false)} show={sidebarOpen}/>
        <main>
          <Routes>
            <Route exact path='/' element={<HomeScreen/>}/>
            <Route exact path='/product/:id' element={<ProductScreen/>}/>
            <Route exact path='/cart' element={<CartScreen/>}/>
            <Route exact path='/success' element={<SuccessScreen/>}/>
            <Route exact path='/failure' element={<FailureScreen/>}/>
            <Route exact path='/pending' element={<PendingScreen/>}/>
            <Route exact path='/profile' element={<ProfileScreen/>}/>
            <Route exact path='/adminProfile' element={<AdminScreen/>}/>
            <Route path='*' element={<div>404</div>}/>
          </Routes>
          <Wave fill='#3f4e8f'
              paused={false}
              options={{
                height: 20,
                amplitude: 20,
                speed: 0.5,
                points: 3,
                responsive: true,
                fill: '#3f4e8f',
                style: {
                  position: 'fixed',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '50%',
                  zIndex: -100,
                  backgroundColor: '#FF7701'
                },
              }}
            />
        </main>
        <Footer />
        <ToastContainer />
    </Router>
  );
}

export default App;
