import React from 'react';
import s from './MyInput.module.scss';


const MyInput = (props) => {
    return (
        <div className={s.addJobInput}>
            <label className={s.addJobInput__label}>{props.label}</label>
            <input className={s.addJobInput__textarea} type={props.type} onChange={(e) => props.onChange(e.target.value)} value={props.value}></input>
        </div>
    );
}
export default MyInput;
