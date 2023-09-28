import React from 'react';
import s from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import search from '../../assets/icon/search/search.svg';
import avatar from '../../assets/icon/search/Group 6.png';
import logoBack from '../../assets/icon/search/logoBack.png';
import {ReactComponent as NeedHelp } from '../../assets/icon/search/NeedHelp .svg';
import {ReactComponent as Bing } from '../../assets/icon/search/bing.svg';
import MyButton from '../myComponents/button/MyButton';





const Header = (props) => {
    console.log(props)
    return (
        <div className={s.header}>
            <div className={s.header__wrapper}>
                <div className={s.header__logo}>
                    <NavLink to={"/"} className={s.header__logoLink}>
                        <div className={s.header__logoWrapperCreate}><img className={s.header__logoCreate} src={logoBack} alt='Logo'/></div>
                        <div className={s.header__logoText}>Human R.</div>
                    </NavLink>
                </div>
                <div className={s.header__blockWrapper}>
                    <form className={s.header__searchingForm}>
                        <input placeholder='Search by anything' className={s.header__searchingInput}></input>
                        <button className={s.header__searchingBtn}><img className={s.header__searchingImg} src={search} alt='search'/></button>
                    </form>
                    <div className={s.header__userBlock}>
                        <div className={s.header__hint}><NeedHelp width="24" height="24"/></div>
                        <div className={s.header__bing}><Bing width="24" height="24"/></div>
                        {props.isAuth 
                        ? 
                        <div className={s.header__avatarWrapper}><img className={s.header__avatar} src={avatar} alt='avatar'/></div> 
                        : 
                        <NavLink to={"/login"}><MyButton className={s.header__loginBtn} textBTN={"Log in"}/></NavLink>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
