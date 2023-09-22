import React from 'react';
import s from "./MyButton.module.scss";


const MyButton = ({...props}) => {
    return (
        <div className={s.myButton}>
            <button className={s.myButton__btn}>{props.textBTN}</button>
        </div>
    );
}

export default MyButton;