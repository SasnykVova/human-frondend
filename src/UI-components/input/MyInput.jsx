import React from 'react';
import s from './MyInput.module.scss';


const MyInput = (props) => {
    return (
        <label className={s.addJobInput} for='datePickerBlock'>
            <label className={s.addJobInput__label}>{props.label}</label>
            <input className={s.addJobInput__textarea} id="datePickerBlock" type={props.type} onChange={(e) => props.onChange(e.target.value)} value={props.value}></input>
        </label>
    );
}
export default MyInput;
