import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import CartScreen from './screens/CartScreen.js';
import Backdrop from './components/Backdrop';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getInformation } from './redux/actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    getInformation().then((res) => {
      dispatch(res);
    }
    );
  // eslint-disable-next-line
  }
  , [])

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
          </Routes>
        </main>
        <Footer />
        <ToastContainer />
    </Router>
  );
}

export default App;
