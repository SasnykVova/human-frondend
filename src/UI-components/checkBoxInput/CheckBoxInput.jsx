import React from 'react';
import s from './CheckBoxInput.module.scss';

const CheckBoxInput = (props) => {

    return (
        <>
            <div className={s.wrapper} style={{display: props.searchInputDisplay}}>
                <label className={s.label}>
                    <input
                        className={s.input}
                        type='checkbox'
                        checked={props.checked}
                        onChange={(e) => props.onClick(e.target.checked)}
                    />
                    {props.label}
                    </label>
            </div>
        </>
    );
}

export default CheckBoxInput;
