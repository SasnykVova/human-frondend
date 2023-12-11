import React from 'react';
import s from './titleInfoBlock.module.scss';

const TitleInfoBlock = (props) => {
    return (
            <div className={s.titleInfoBlock}>
                <div className={s.title}>{props.title}</div>
                <div className={s.info}>{props.info}</div>
            </div>
    );
}

export default TitleInfoBlock;
