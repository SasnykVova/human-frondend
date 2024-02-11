import React, { useState } from 'react';
import s from "./MyButton.module.scss";
import Loader from '../loader/Loader';


const MyButton = ({ ...props }) => {
    const gapSize = props.gap;
    const disabled = props.disabled;

    const [hover, setHover] = useState(false);
    return (
        <div className={s.myButton} style={{ display: props.displayMyButton, padding: window.innerWidth < 320 ? '15px 0px' : props.padMyButton, justifyContent: props.justContent, alignSelf: props.alignSelf }}>
            <button className={s.myButton__btn} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} 
            onClick={props.onClick} 
            disabled={disabled}
            style={{ fontSize: props.fontSize, backgroundColor: hover ? props.bg : props.deactivateBackCol ,color: hover ? props.col : props.deactivateColor, background: disabled === 'true' ? 'grey' : '',
            border: hover ? props.bor : props.deactivateBorder, width: props.width}}>
                <div className={s.btnIcon} style={{ paddingRight: `${gapSize}`, display: props.displayIcon}}>{props.icon}</div>
                <div>{props.title}</div>
            </button>
        </div>
    );
}

export default MyButton;