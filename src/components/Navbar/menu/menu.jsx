import React from 'react';
import s from './menu.module.scss';
import { NavLink } from 'react-router-dom';
import './menu.scss';
import { ReactComponent as Dashboard } from '../../../assets/icon/navbarIcon/dashboard.svg';
import { ReactComponent as Message } from '../../../assets/icon/navbarIcon/messageText.svg';
import { ReactComponent as Calendar } from '../../../assets/icon/navbarIcon/calendar.svg';
import { ReactComponent as Jobs } from '../../../assets/icon/navbarIcon/job.svg';
import { ReactComponent as DashboardRec } from '../../../assets/icon/navbarIcon/dashboardRec.svg';
import { ReactComponent as MyRef } from '../../../assets/icon/navbarIcon/MyRef.svg';
import { ReactComponent as Career } from '../../../assets/icon/navbarIcon/careerSite.svg';
import { ReactComponent as Employee } from '../../../assets/icon/navbarIcon/employee.svg';
import { ReactComponent as Structure } from '../../../assets/icon/navbarIcon/MyRef.svg';
import { ReactComponent as Report } from '../../../assets/icon/navbarIcon/report.svg';
import { ReactComponent as Settings } from '../../../assets/icon/navbarIcon/setting.svg';

const Menu = () => {
    return (
        <div className={s.navbar}>
            <div className={s.menu}>Menu</div>
            <nav id="sidebar-menu" className='menu__nav nav'>
                <ul className='menu__list list'>
                    <NavLink to={'/dashboard'} className='menu__itemLink itemLink'>
                        <Dashboard className='menu__icon icon' width="24" height="24" />
                        <li className='menu__item item'>Dashboard</li>
                    </NavLink>
                    <NavLink to={'/message'} className='menu__itemLink itemLink'>
                        <Message className='menu__icon icon' width="24" height="24" />
                        <li className='menu__item item'>Message</li>
                    </NavLink>
                    <NavLink to={'/calendar'} className='menu__itemLink itemLink'>
                        <Calendar className='menu__icon icon' width="24" height="24" />
                        <li className='menu__item item'>Calendar</li>
                    </NavLink>
                </ul>
            </nav>
            <h3 className={s.recruitment}>Recruitment</h3>
            <nav id="sidebar-recruitment" className='recruitment__nav nav'>
                <ul className='recruitment__list list'>
                    <NavLink to={'/jobs'} className='recruitment__itemLink itemLink'>
                        <Jobs className='menu__icon icon' width="24" height="24" />
                        <li className='recruitment__item item'>Jobs</li>
                    </NavLink>
                    <NavLink to={'/candidates'} className='recruitment__itemLink itemLink'>
                        <DashboardRec className='menu__icon icon' width="24" height="24" />
                        <li className='recruitment__item item'>Dashboard</li>
                    </NavLink>
                    <NavLink to={'/referrals'} className='recruitment__itemLink itemLink'>
                        <MyRef className='menu__icon icon' width="24" height="24" />
                        <li className='recruitment__item item'>My Referrals</li>
                    </NavLink>
                    <NavLink to={'/career'} className='recruitment__itemLink itemLink'>
                        <Career className='menu__icon icon' width="24" height="24" />
                        <li className='recruitment__item item'>Career Site</li>
                    </NavLink>
                </ul>
            </nav>
            <h3 className={s.organization}>ORGANIZATION</h3>
            <nav id="sidebar-organization" className='organization__nav nav'>
                <ul className='organization__list list'>
                    <NavLink to={'/employee'} className='organization__itemLink itemLink'>
                        <Employee className='menu__icon icon' width="24" height="24" /><li className='organization__item item'>Employee</li>
                    </NavLink>
                    <NavLink to={'/structure'} className='organization__itemLink itemLink'>
                        <Structure className='menu__icon icon' width="24" height="24" /><li className='organization__item item'>Structure</li>
                    </NavLink>
                    <NavLink to={'/report'} className='organization__itemLink itemLink'>
                        <Report className='menu__icon icon' width="24" height="24" /><li className='organization__item item'>Report</li>
                    </NavLink>
                    <NavLink to={'/settings'} className='organization__itemLink itemLink'>
                        <Settings className='menu__icon icon' width="24" height="24" /><li className='organization__item item'>Settings</li>
                    </NavLink>
                </ul>
            </nav>
        </div>
    );
}

export default Menu;
