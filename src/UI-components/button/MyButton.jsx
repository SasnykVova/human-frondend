import React, { useState } from 'react';
import s from "./MyButton.module.scss";


const MyButton = ({ ...props }) => {
    const gapSize = props.gap;

    const [hover, setHover] = useState(false);
    return (
        <div className={s.myButton} style={{ display: props.displayMyButton, padding: props.padMyButton }}>
            <button className={s.myButton__btn} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} 
            onClick={props.onClick} style={{ fontSize: props.fontSize, backgroundColor: hover ? props.bg : '' ,color: hover ? props.col : '',border: hover ? props.bor : ''}}>
                <div className={s.btnIcon} style={{ paddingRight: `${gapSize}` }}>{props.icon}</div>
                <div>{props.title}</div>
            </button>
        </div>
    );
}

export default MyButton;