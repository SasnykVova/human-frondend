import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { useLocation, useNavigate } from 'react-router';
import Login from './components/login/login';
import Header from './components/header/Header';
import { useSelector } from 'react-redux';
import { renderRoutes } from './routes/renderRoutes';


function useTokenCheck() {
  
  const navigate = useNavigate()
  const [ storedToken , setStoredToken  ] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const checkToken = () => {
      const currentToken = localStorage.getItem('token');
      setStoredToken(currentToken);

      if (!currentToken) {
        navigate('/login');
      }
    };

    checkToken();

    window.addEventListener('storage', checkToken);

    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, [navigate]);
  
  return storedToken;
}

function App() {

  const location = useLocation();
  useTokenCheck();
  const state = useSelector((state) => state.authreducer);
  const token = state?.token;
  console.log(token)

  return (
    <div className='app'> 
      {location.pathname === '/login'
      ?
      <div><Login className='login-block'/></div>
      :
      <div className='app-wrapper'>
        <Header className='header'/>
        <Navbar className='navBar'/>
        <div className='main-content'>
          {renderRoutes(token)}
        </div>
      </div>
}
    </div>
  );
}

export default React.memo(App);
