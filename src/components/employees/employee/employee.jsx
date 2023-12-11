import React, { useState } from 'react';
import s from './employee.module.scss';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Route, Routes } from 'react-router';
import EmployeeDetails from './employeeDetails/employeeDetails';

const Employee = (props) => {

    const [hover, setHover] = useState(false);

    return (
        <div onClick={props.onClickTest} className={s.employee}>
            <div className={s.wrapper}>
                <div className={s.name}>{props.name} {props.surName}</div>
                <div className={s.position}>{props.position}</div>
                <div className={s.location}>{props.location}</div>
                <div className={s.mobileNumber}>{props.mobileNumber}</div>
                <div className={s.birthDate}>{props.birthData}</div>
                <div className={s.deleteBtn} onClick={props.onClickDelete} onMouseEnter={() => setHover(true)} 
                onMouseLeave={() => setHover(false)}>
                    <RiDeleteBin6Line color={ hover ? 'red' : '#000'} size={25}/>
                    </div>
            </div>
            <Routes>
                <Route path={`/employeses/employeses/${props.key}`} element={<EmployeeDetails id={props.key} />} />
            </Routes>
        </div>
    );
}

export default Employee;
