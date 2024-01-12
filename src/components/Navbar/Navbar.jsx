import React, { useState } from 'react';
import s from './Navbar.module.scss';
import './Navbar.scss';
import ShortMenu from './shortMenu/ShortMenu';
import Menu from './menu/menu';




const Navbar = () => {

    const [menuActive, setMenuActive] = useState(true);
    console.log(menuActive);

    return (
        <div className={s.navbar}>
            <div onClick={() => setMenuActive(!menuActive)} className={s.burgerBtn}>
                <span className={s.burgerBtn__middleLine}></span>
            </div>
            {menuActive ? <Menu/> : <ShortMenu/>}
        </div>
    );
}

export default Navbar;
