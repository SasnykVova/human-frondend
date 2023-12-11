import React from 'react';
import s from './Loader.module.scss';

const Loader = (props) => {
    return (
        <div>
            <div className={s.loader} style={{width: props.width, height:props.height}}></div>
        </div>
    );
}

export default Loader;
