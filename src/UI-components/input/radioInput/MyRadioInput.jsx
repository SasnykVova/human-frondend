import React from 'react';
import s from './MyRadioInput.module.scss';

const MyRadioInput = (props) => {
    return (
        <div className={s.addJobInput}>
            <div className={s.title}>
                <h1>{props.title}</h1>
            </div>
            <div className={s.optionBlockWrapper}>
                <div className={s.optionBlock}>
                    <input id='Male' className={s.input} type={props.type} name={props.label1} onChange={(e) => props.onChange(e.target.name)} checked={props.checked === props.label1}/>
                    <label for='Male' className={s.addJobInput__label}>{props.label1}</label>
                </div>
                <div className={s.optionBlock}>
                    <input id='Female' className={s.input} type={props.type} name={props.label2} onChange={(e) => props.onChange(e.target.name)} checked={props.checked === props.label2}/>
                    <label for='Female' className={s.addJobInput__label}>{props.label2}</label>
                </div>
                <div className={s.optionBlock}>
                    <input id='Another' className={s.input} type={props.type} name={props.label3} onChange={(e) => props.onChange(e.target.name)} checked={props.checked === props.label3}/>
                    <label for='Another' className={s.addJobInput__label}>{props.label3}</label>
                </div>
            </div>
        </div>
    );
}

export default MyRadioInput;
