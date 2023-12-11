import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Candidates from './components/candidates/Candidates';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router';
import Message from './components/message/Message';
import Jobs from './components/jobs/Jobs';
import HeaderContainer from './components/header/HeaderContainer';
import Login from './components/login/login';
import RegisterContainer from './components/registration/RegisterContainer';
import { useSelector } from 'react-redux';
import Employees from './components/employees/Employees';
import Home from './components/homePage/HomePage';
import EmployeeDetails from './components/employees/employee/employeeDetails/employeeDetails';
// import HomePage from './components/homePage/HomePage';



function App() {
  const state = useSelector(state => state.auth)
  const location = useLocation();
  let token = localStorage.getItem('token');
  const navigate = useNavigate()
  console.log(token)
  console.log(location.pathname)


  useEffect(() => {
    if(token === null) {
      navigate('/login')
    }
  },[token])

  return (
    <div className='app'>
      {location.pathname === '/login'
      ?
      <div><Login className='login-block'/></div>
      :
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='main-content'>
          <Routes>
            {/* <Route path='/' element={<HomePage/>}/>  */}
              <Route>
                <Route path='/' element={token === null ? <Navigate to={'/login'}/> : <Home/>}/>
                <Route path='/login/registration' element={<RegisterContainer />} />
                <Route path='/candidates' element={token === null ? <Navigate to={'/login'}/> : <Candidates />} />
                <Route path='/message' element={<Message />} />
                <Route path='/jobs/*' element={token === null ? <Navigate to={'/login'}/> : <Jobs/>} />
                <Route path='/employees' element={token === null ? <Navigate to={'/login'}/> : <Employees/>}/>
                <Route path='/employees/:id' element={token === null ? <Navigate to={'/login'}/> : <EmployeeDetails/>}/>
                <Route path='*' element={<div style={{fontSize: '20px', textAlign: 'center'}}>Not found</div>}/>
              </Route>
          </Routes>
        </div>
      </div>
}
    </div>
  );
}

export default App;
