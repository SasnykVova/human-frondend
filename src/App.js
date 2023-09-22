import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Candidates from './components/candidates/Candidates';
import { Route, Routes } from 'react-router';
import Message from './components/message/Message';
import JobsContainer from './components/jobs/JobsContainer';
import HeaderContainer from './components/header/HeaderContainer';


function App() {
  return (
    <div className='app-wrapper'>
      <HeaderContainer/>
      <Navbar/>
      <div className='main-content'>
        <Routes>
          <Route path='/candidates' element={<Candidates/>}/>
          <Route path='/message' element={<Message/>}/>
          <Route path='/jobs' element={<JobsContainer/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
