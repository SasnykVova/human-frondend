import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router';
import Jobs from './components/jobs/Jobs';
import HeaderContainer from './components/header/HeaderContainer';
import Login from './components/login/login';
import RegisterContainer from './components/registration/RegisterContainer';
import { useSelector } from 'react-redux';
import Employees from './components/employees/Employees';
import EmployeeDetails from './components/employees/employee/employeeDetails/employeeDetails';
import Dashboard from './components/homePage/Dashboard';
import Profile from './components/profile/Profile';
// import HomePage from './components/homePage/HomePage';
import VacancyDetails from './components/jobs/vacancyDetails/VacancyDetails';
import Candidates from './components/candidates/Candidates';
import CandidateDetails from './components/candidates/candidateDetails/CandidateDetails';
import AddCandidate from './components/candidates/addCandidate/AddCandidate';




function App() {
  const state = useSelector(state => state.auth)
  const location = useLocation();
  const navigate = useNavigate()


  useEffect(() => {
    if(state.token === null) {
      navigate('/login')
    }
  },[state.token, navigate])

  return (
    <div className='app'>
      {location.pathname === '/login'
      ?
      <div><Login className='login-block'/></div>
      :
      <div className='app-wrapper'>
        <HeaderContainer className='header'/>
        <Navbar className='navBar'/>
        <div className='main-content'>
          <Routes>
            {/* <Route path='/' element={<HomePage/>}/>  */}
              <Route>
                <Route path='/' element={state.token === null ? <Navigate to={'/login'}/> : <Dashboard/>}/>
                <Route path='/profile/*' element={state.token === null ? <Navigate to={'/login'}/> : <Profile/>}/>
                <Route path='/login/registration' element={<RegisterContainer />} />
                <Route path='/candidates' element={state.token === null ? <Navigate to={'/login'}/> : <Candidates/>} />
                <Route path='/candidates/:id' element={state.token === null ? <Navigate to={'/login'}/> : <CandidateDetails/>} />
                <Route path='/candidates/adding' element={state.token === null ? <Navigate to={'/login'}/> : <AddCandidate/>} />
                <Route path='/jobs/*' element={state.token === null ? <Navigate to={'/login'}/> : <Jobs/>} />
                <Route path='/jobs/all/:id/*' element={state.token === null ? <Navigate to={'/login'}/> : <VacancyDetails/>} />
                <Route path='/employees' element={state.token === null ? <Navigate to={'/login'}/> : <Employees/>}/>
                <Route path='/employees/:id' element={state.token === null ? <Navigate to={'/login'}/> : <EmployeeDetails/>}/>
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
