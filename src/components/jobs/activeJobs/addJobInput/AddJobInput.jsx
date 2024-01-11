import React from 'react';
import s from './AddJobInput.module.scss'

const AddJobInput = (props) => {
    return (
        <div className={s.addJobInput}>
            <label className={s.addJobInput__label}>{props.label}</label>
            <input className={s.addJobInput__textarea} style={{width: props.widthInput}} type='text' onChange={(e) => props.onChange(e.target.value)} value={props.value}></input>
        </div>
    );
}

export default AddJobInput;
