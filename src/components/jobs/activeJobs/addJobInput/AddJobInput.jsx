import React from 'react';
import s from './AddJobInput.module.scss'

const AddJobInput = (props) => {
    return (
        <div className={s.addJobInput}>
            <label className={s.addJobInput__label}>{props.label}</label>
            <textarea className={s.addJobInput__textarea} onChange={(e) => props.onChange(e.target.value)} value={props.value}></textarea>
        </div>
    );
}

export default AddJobInput;
