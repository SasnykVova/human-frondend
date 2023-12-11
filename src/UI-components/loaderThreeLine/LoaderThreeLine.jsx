import React from 'react';
import s from './LoaderThreeLine.module.scss';

const LoaderThreeLine = () => {
    return (
        <div>
            <div className={s.loader}>Loading...</div>
        </div>
    );
}

export default LoaderThreeLine;
