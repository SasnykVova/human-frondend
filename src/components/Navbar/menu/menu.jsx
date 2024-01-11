import React from 'react';
import s from './menu.module.scss';
import { NavLink } from 'react-router-dom';
import './menu.scss';
import { ReactComponent as Dashboard } from '../../../assets/icon/navbarIcon/dashboard.svg';
import { ReactComponent as Jobs } from '../../../assets/icon/navbarIcon/job.svg';
import { ReactComponent as DashboardRec } from '../../../assets/icon/navbarIcon/dashboardRec.svg';
import { ReactComponent as Employee } from '../../../assets/icon/navbarIcon/employee.svg';
import { ImProfile } from "react-icons/im";
import { useTranslation } from 'react-i18next';


const Menu = () => {

    const { t, i18n } = useTranslation();

    return (
        <div className={s.navbar}>
            <div className={s.menu}>{t("navBar.menu")}</div>
            <nav id="sidebar-menu" className='menu__nav nav'>
                <ul className='menu__list list'>
                    <NavLink to={'/'} className='menu__itemLink itemLink'>
                        <Dashboard className='menu__icon icon' width="24" height="24" />
                        <li className='menu__item item'>{t("navBar.dashboard")}</li>
                    </NavLink>
                    <NavLink to={'/profile/details'} className='menu__itemLink itemLink'>
                        <ImProfile className='menu__icon icon' size={24}/>
                        <li className='menu__item item'>{t("navBar.profile")}</li>
                    </NavLink>
                </ul>
            </nav>
            <h3 className={s.recruitment}>{t("navBar.recruitment")}</h3>
            <nav id="sidebar-recruitment" className='recruitment__nav nav'>
                <ul className='recruitment__list list'>
                    <NavLink to={'/jobs/all'} className='recruitment__itemLink itemLink'>
                        <Jobs className='menu__icon icon' width="24" height="24" />
                        <li className='recruitment__item item'>{t("navBar.vacancies")}</li>
                    </NavLink>
                    <NavLink to={'/candidates'} className='recruitment__itemLink itemLink'>
                        <DashboardRec className='menu__icon icon' width="24" height="24" />
                        <li className='recruitment__item item'>{t("navBar.candidates")}</li>
                    </NavLink>
                </ul>
            </nav>
            <h3 className={s.organization}>{t("navBar.organization")}</h3>
            <nav id="sidebar-organization" className='organization__nav nav'>
                <ul className='organization__list list'>
                    <NavLink to={'/employees'} className='organization__itemLink itemLink'>
                        <Employee className='menu__icon icon' width="24" height="24" /><li className='organization__item item'>{t("navBar.employees")}</li>
                    </NavLink>
                </ul>
            </nav>
        </div>
    );
}

export default Menu;
