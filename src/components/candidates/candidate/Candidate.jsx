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
                    <div className={s.name}><div className={s.text}>{props.name} {props.surname}</div></div>
                    <div className={s.location}><div className={s.text}>{props.location}</div></div>
                    <div className={s.position}><div className={s.text}>{props.position}</div></div>
                    <div className={s.mobileNumber}><div className={s.text}>{props.mobileNumber}</div></div>
                    <div className={s.birthDate}><div className={s.text}>{props.birthDate}</div></div>
                    <div className={s.deleteBtn} onClick={props.onClickDelete} onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}>
                        <div className={s.text}><RiDeleteBin6Line color={hover ? 'red' : '#000'} size={25} /></div>
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
