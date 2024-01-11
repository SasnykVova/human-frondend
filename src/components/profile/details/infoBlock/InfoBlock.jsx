import React from 'react';
import s from './InfoBlock.module.scss';


const InfoBlock = (props) => {
    return (
        <>
            <div className={s.info}>
                        <div className={s.infoBlock}>
                            {props.data.map(e => 
                            <div className={s.item}>
                                <div className={s.key}>{e.titleKey}</div>
                                <div className={s.value}>{e.value}</div>
                            </div>)}
                        </div>
                    </div>
        </>
    );
}

export default InfoBlock;
