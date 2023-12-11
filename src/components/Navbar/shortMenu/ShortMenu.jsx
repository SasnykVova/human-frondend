import React from 'react';
import s from './ShortMenu.module.scss';
import { NavLink } from 'react-router-dom';
import './ShortMenu.scss';
import { ReactComponent as Dashboard } from '../../../assets/icon/navbarIcon/dashboard.svg';
import { ReactComponent as Message } from '../../../assets/icon/navbarIcon/messageText.svg';
import { ReactComponent as Calendar } from '../../../assets/icon/navbarIcon/calendar.svg';
import { ReactComponent as Jobs } from '../../../assets/icon/navbarIcon/job.svg';
import { ReactComponent as DashboardRec } from '../../../assets/icon/navbarIcon/dashboardRec.svg';
import { ReactComponent as MyRef } from '../../../assets/icon/navbarIcon/MyRef.svg';
import { ReactComponent as Career } from '../../..//assets/icon/navbarIcon/careerSite.svg';
import { ReactComponent as Employee } from '../../../assets/icon/navbarIcon/employee.svg';
import { ReactComponent as Structure } from '../../../assets/icon/navbarIcon/MyRef.svg';
import { ReactComponent as Report } from '../../../assets/icon/navbarIcon/report.svg';
import { ReactComponent as Settings } from '../../../assets/icon/navbarIcon/setting.svg';

const ShortMenu = () => {
    return (
        <div>
            <div className={s.menu}></div>
            <nav id="sidebar-shortMenu" className='shortMenu__nav navshortMenu'>
                <ul className='shortMenu__list listShortMenu'>
                    <NavLink to={'/dashboard'} className='shortMenu__itemLink itemLinkShortMenu'>
                        <Dashboard className='shortMenu__icon icon' width="24" height="24" />
                    </NavLink>
                    <NavLink to={'/message'} className='shortMenu__itemLink itemLinkShortMenu'>
                        <Message className='shortMenu__icon icon' width="24" height="24" />
                    </NavLink>
                    <NavLink to={'/calendar'} className='shortMenu__itemLink itemLinkShortMenu'>
                        <Calendar className='shortMenu__icon icon' width="24" height="24" />
                    </NavLink>
                </ul>
            </nav>
            <div className={s.recruitment}></div>
            <nav id="sidebar-shortMenuRecruitment" className='shortMenuRecruitment__nav navshortMenu'>
                <ul className='shortMenuRecruitment__list listShortMenu'>
                    <NavLink to={'/jobs/all'} className='shortMenuRecruitment__itemLink itemLinkShortMenu'>
                        <Jobs className='shortMenu__icon icon' width="24" height="24" />
                    </NavLink>
                    <NavLink to={'/candidates'} className='shortMenuRecruitment__itemLink itemLinkShortMenu'>
                        <DashboardRec className='shortMenu__icon icon' width="24" height="24" />
                    </NavLink>
                    <NavLink to={'/referrals'} className='shortMenuRecruitment__itemLink itemLinkShortMenu'>
                        <MyRef className='shortMenu__icon icon' width="24" height="24" />
                    </NavLink>
                    <NavLink to={'/career'} className='shortMenuRecruitment__itemLink itemLinkShortMenu'>
                        <Career className='shortMenu__icon icon' width="24" height="24" />
                    </NavLink>
                </ul>
            </nav>
            <div className={s.organization}></div>
            <nav id="sidebar-shortMenuOrganization" className='shortMenuOrganization__nav navshortMenu'>
                <ul className='shortMenuOrganization__list listShortMenu'>
                    <NavLink to={'/employees'} className='shortMenuOrganization__itemLink itemLinkShortMenu'>
                        <Employee className='shortMenu__icon icon' width="24" height="24" />
                    </NavLink>
                    <NavLink to={'/structure'} className='shortMenuOrganization__itemLink itemLinkShortMenu'>
                        <Structure className='shortMenu__icon icon' width="24" height="24" />
                    </NavLink>
                    <NavLink to={'/report'} className='shortMenuOrganization__itemLink itemLinkShortMenu'>
                        <Report className='shortMenu__icon icon' width="24" height="24" />
                    </NavLink>
                    <NavLink to={'/settings'} className='shortMenuOrganization__itemLink itemLinkShortMenu'>
                        <Settings className='shortMenu__icon icon' width="24" height="24" />
                    </NavLink>
                </ul>
            </nav>
        </div>
    );
}

export default ShortMenu;
