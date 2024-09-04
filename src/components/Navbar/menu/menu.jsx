import React, { useState } from "react";
import s from "./menu.module.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./menu.scss";
import { ReactComponent as Dashboard } from "../../../assets/icon/navbarIcon/dashboard.svg";
import { ReactComponent as Jobs } from "../../../assets/icon/navbarIcon/job.svg";
import { ReactComponent as DashboardRec } from "../../../assets/icon/navbarIcon/dashboardRec.svg";
import { ReactComponent as Employee } from "../../../assets/icon/navbarIcon/employee.svg";
import { ImProfile } from "react-icons/im";
import { useTranslation } from "react-i18next";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { authSlice } from "../../../toolkitRedux/reducer/authSlice";

const Menu = (props) => {
  const setMenuActive = props.onClick;
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const actions = authSlice.actions;
  const navigate = useNavigate();

  const location = useLocation();
    const { pathname } = location;
    const cutPathname = (pathname) => pathname.split('/')[1]
    const resCutPath = cutPathname(pathname);
  

  const [closedMenu, setClosedMenu] = useState(false);


  const handleClosedMenu = () => {
    setClosedMenu(false);
    setMenuActive();
  };

  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(actions.logOut());
    navigate("/login");
  };

  return (
    <div className={closedMenu ? `${s.navbar} ${s.closedMenu}` : `${s.navbar}`}>
      <div className={s.wrapper}>
        <div className={s.menuWrapper}>
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
                <ImProfile className="menu__icon icon" size={24} />
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
        <div className={s.buttonsWrapper}>
        <div className={s.header__avatarWrapper}>
                <button className={s.button} onClick={() => logOut()}>
                  <IoIosLogOut color="#333333" size={30} className={s.icon} />
                  <div className={s.title}>{t("header.logout")}</div>
                </button>
              </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
