import React from 'react';
import s from './Сriterion.module.scss';

const Criterion = ({...props}) => {
    return (
        <div className={s.criterion} style={{minWidth: props.width}}>
            <div className={s.icon}>{props.icon}</div>
            <div className={s.title}>{props.title}</div>
        </div>
    );
}

export default Criterion;
