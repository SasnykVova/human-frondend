import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Profile from '../components/profile/Profile';
import Register from '../components/registration/Register';
import Candidates from '../components/candidates/Candidates';
import CandidateDetails from '../components/candidates/candidateDetails/CandidateDetails';
import AddCandidate from '../components/candidates/addCandidate/AddCandidate';
import Jobs from '../components/jobs/Jobs';
import VacancyDetails from '../components/jobs/vacancyDetails/VacancyDetails';
import AddingVacancy from '../components/jobs/addingVacancy/AddingVacancy';
import Employees from '../components/employees/Employees';
import EmployeeDetails from '../components/employees/employee/employeeDetails/employeeDetails';
import AddEmployee from '../components/employees/addEmployee/AddEmployee';
import Dashboard from '../components/homePage/Dashboard';

export const renderRoutes = (token) => (
    <Routes>
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/profile/*' element={token === null ? <Navigate to={'/login'}/> : <Profile/>}/>
    <Route path='/login/registration' element={<Register/>} />
    <Route path='/candidates' element={token === null ? <Navigate to={'/login'}/> : <Candidates/>} />
    <Route path='/candidates/:id' element={token === null ? <Navigate to={'/login'}/> : <CandidateDetails/>} />
    <Route path='/candidates/adding' element={token === null ? <Navigate to={'/login'}/> : <AddCandidate/>} />
    <Route path='/jobs/*' element={token === null ? <Navigate to={'/login'}/> : <Jobs/>} />
    <Route path='/jobs/all/:id/*' element={token === null ? <Navigate to={'/login'}/> : <VacancyDetails/>} />
    <Route path='/jobs/adding' element={token === null ? <Navigate to={'/login'}/> : <AddingVacancy/>} />
    <Route path='/employees' element={token === null ? <Navigate to={'/login'}/> : <Employees/>}/>
    <Route path='/employees/:id' element={token === null ? <Navigate to={'/login'}/> : <EmployeeDetails/>}/>
    <Route path='/employees/adding' element={token === null ? <Navigate to={'/login'}/> : <AddEmployee/>}/>
    <Route path='*' element={<div style={{fontSize: '20px', textAlign: 'center'}}>Not found</div>}/>
</Routes>
);
