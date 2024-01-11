import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainHeader.scss';



const MainHeader = (props) => {
    return (
        <>
            <div id='statusBlock-menuu' className="statusBlock">
                {props.data.map(n => <NavLink className={n.className} to={n.to}>{n.title}</NavLink>)}
            </div>
            <div className='line'></div>
        </>
    );
}

export default MainHeader;
