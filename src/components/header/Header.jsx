import React, { useEffect, useState } from 'react';
import s from './Header.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import search from '../../assets/icon/search/search.svg';
import avatar from '../../assets/icon/search/Group 6.png';
import logoBack from '../../assets/icon/search/logoBack.png';
import {ReactComponent as NeedHelp } from '../../assets/icon/search/NeedHelp .svg';
import {ReactComponent as Bing } from '../../assets/icon/search/bing.svg';
import MyButton from '../../UI-components/button/MyButton';
import { useDispatch, useSelector } from 'react-redux';
import { authSlice } from '../../toolkitRedux/reducer/authSlice';
import { IoIosLogOut } from "react-icons/io";
import {ReactComponent as Logo} from './../../assets/icon/header/logo-hrcore.svg'
import UkraneFlag from './../../assets/icon/header/ukraine-flag-round-circle-icon.png';
import {ReactComponent as UkFlag} from './../../assets/icon/header/uk-flag.svg';
import { useTranslation } from 'react-i18next';







const Header = () => {
    console.log(localStorage.getItem('token'))
    const state = useSelector(state => state.auth)
    const navigate = useNavigate(); 
    const dispatch = useDispatch()
    const {...actions } = authSlice.actions

    const { t, i18n } = useTranslation();


    const [language, setLanguage] = useState('English')


    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    }


    const logOut = () => {
        localStorage.removeItem('token')
        dispatch(actions.logOut())
        navigate('/login')
        }
    
    useEffect(() => {
        changeLanguage(language)
    }, [language])    

    useEffect(() => {
        if(state.token === null) {
            navigate('/login')
        } 
    }, [state.getLogout.success])

    return (
        <div className={s.header}>
            <div className={s.header__wrapper}>
                <div className={s.header__logo}>
                    <NavLink to={"/"} className={s.header__logoLink}>
                        <div className={s.header__logoWrapperCreate}>
                            {/* <img className={s.header__logoCreate} src={Logo} alt='Logo'/> */}
                            <Logo className={s.header__logoCreate}/>

                        </div>
                        {/* <div className={s.header__logoText}>HR Core</div> */}
                    </NavLink>
                </div>
                <div className={s.header__blockWrapper}>
                    {/* <form className={s.header__searchingForm}>
                        <input placeholder='Search by anything' className={s.header__searchingInput}></input>
                        <button className={s.header__searchingBtn}><img className={s.header__searchingImg} src={search} alt='search'/></button>
                    </form> */}
                    <div className={s.header__userBlock}>
                        <div className={s.languagesSwitcher}>
                            <select className={s.select} onChange={(e) => setLanguage(e.target.value)} value={language}>
                                <option className={s.option} value='ua'>Ukrainian</option>
                                <option className={s.option} value='en'>English</option>
                            </select>
                        </div>
                        <div className={s.line}></div>
                        {state.token
                        ? 
                        <div className={s.header__avatarWrapper}>
                            <button className={s.button} onClick={() => logOut()}>
                                <IoIosLogOut color='#333333' size={30} className={s.icon}/>
                                <div className={s.title}>{t("header.logout")}</div>
                            </button>
                            {/* <MyButton  className={s.header__loginBtn} onClick={() => logOut()} title={"Log out"}/> */}
                        </div>
                         
                        : 
                        'No token'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
