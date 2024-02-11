import React from 'react';
import s from './Textarea.module.scss';

const Textarea = (props) => {
    return (
        <>
            <div className={s.textareaWrapper}>
            <label className={s.label}>{props.label}</label>
            <textarea 
                className={s.textarea} 
                style={{minWidth: window.innerWidth > 1200 ? props.widthInput : '100%', 
                height: window.innerWidth > 1200 ? props.heightInput : '100px'}} 
                type='text' 
                onChange={(e) => props.onChange(e.target.value)} 
                value={props.value}
            > 
            </textarea>
        </div>
        </>
    );
}

export default Textarea;
