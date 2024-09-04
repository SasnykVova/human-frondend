import React, { useState } from 'react';
import s from './MenuDesktop.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import './MenuDesktop.scss';
import { ReactComponent as Dashboard } from '../../../assets/icon/navbarIcon/dashboard.svg';
import { ReactComponent as Jobs } from '../../../assets/icon/navbarIcon/job.svg';
import { ReactComponent as DashboardRec } from '../../../assets/icon/navbarIcon/dashboardRec.svg';
import { ReactComponent as Employee } from '../../../assets/icon/navbarIcon/employee.svg';
import { ImProfile } from "react-icons/im";
import { useTranslation } from 'react-i18next';

const MenuDesktop = () => {

   
    const { t } = useTranslation();
    const [closedMenu, setClosedMenu ] = useState(false);

    const location = useLocation();
    const { pathname } = location;
    const cutPathname = (pathname) => pathname.split('/')[1]
    const resCutPath = cutPathname(pathname);

    
    const handleClosedMenu = () => {
        setClosedMenu(false)
    }

  return (
    <>
      <div
        className={closedMenu ? `${s.navbar} ${s.closedMenu}` : `${s.navbar}`}
      >
        <div className={s.wrapper}>
          <div className={s.menu}>{t("navBar.menu")}</div>
          <nav id="sidebar-menu" className="menu__nav nav">
            <ul className="menu__list list">
              <NavLink
                onClick={handleClosedMenu}
                to={"/"}
                className="menu__itemLink itemLink"
              >
                <Dashboard className="menu__icon icon" width="24" height="24" />
                <li className="menu__item item">{t("navBar.dashboard")}</li>
              </NavLink>
              <NavLink
                onClick={handleClosedMenu}
                to={"/profile/details"}
                className={`menu__itemLink itemLink ${resCutPath === 'profile' ? 'itemLinkActive' : ''}`}
              >
                <ImProfile className="menu__icon icon" size={24}/>
                <li className="menu__item item">{t("navBar.profile")}</li>
              </NavLink>
            </ul>
          </nav>
          <h3 className={s.recruitment}>{t("navBar.recruitment")}</h3>
          <nav id="sidebar-recruitment" className="recruitment__nav nav">
            <ul className="recruitment__list list">
              <NavLink
                onClick={handleClosedMenu}
                to={"/jobs/all"}
                className={`recruitment__itemLink itemLink ${resCutPath === 'jobs' ? 'itemLinkActive' : ''}`}
              >
                <Jobs className="menu__icon icon" width="24" height="24" />
                <li className="recruitment__item item">
                  {t("navBar.vacancies")}
                </li>
              </NavLink>
              <NavLink
                onClick={handleClosedMenu}
                to={"/candidates"}
                className="recruitment__itemLink itemLink"
              >
                <DashboardRec
                  className="menu__icon icon"
                  width="24"
                  height="24"
                />
                <li className="recruitment__item item">
                  {t("navBar.candidates")}
                </li>
              </NavLink>
            </ul>
          </nav>
          <h3 className={s.organization}>{t("navBar.organization")}</h3>
          <nav id="sidebar-organization" className="organization__nav nav">
            <ul className="organization__list list">
              <NavLink
                onClick={handleClosedMenu}
                to={"/employees"}
                className="organization__itemLink itemLink"
              >
                <Employee className="menu__icon icon" width="24" height="24" />
                <li className="organization__item item">
                  {t("navBar.employees")}
                </li>
              </NavLink>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MenuDesktop;
