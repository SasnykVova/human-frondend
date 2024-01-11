import React, { useState } from 'react';
import s from './Candidate.module.scss';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Route, Routes } from 'react-router';
import birthDateSplit from './../../../assets/common/birthDateSplit';


const Candidate = (props) => {

    const [hover, setHover] = useState(false);

    return (
        <>
            <div onClick={props.onClickTest} className={s.candidate}>
                <div className={s.wrapper}>
                    <div className={s.name}>{props.name} {props.surname}</div>
                    <div className={s.location}>{props.location}</div>
                    <div className={s.position}>{props.position}</div>
                    <div className={s.mobileNumber}>{props.mobileNumber}</div>
                    <div className={s.birthDate}>{props.birthDate}</div>
                    <div className={s.deleteBtn} onClick={props.onClickDelete} onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}>
                        <RiDeleteBin6Line color={hover ? 'red' : '#000'} size={25} />
                    </div>
                </div>
                <Routes>
                    <Route path={`/employeses/employeses/${props.key}`} element={''} />
                </Routes>
            </div>
        </>
    );
}

export default Candidate;
