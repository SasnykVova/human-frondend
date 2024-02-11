import React, { useEffect, useState } from "react";
import s from "./Header.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import search from "../../assets/icon/search/search.svg";
import avatar from "../../assets/icon/search/Group 6.png";
import logoBack from "../../assets/icon/search/logoBack.png";
import { ReactComponent as NeedHelp } from "../../assets/icon/search/NeedHelp .svg";
import { ReactComponent as Bing } from "../../assets/icon/search/bing.svg";
import MyButton from "../../UI-components/button/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "../../toolkitRedux/reducer/authSlice";
import { IoIosLogOut } from "react-icons/io";
import { ReactComponent as Logo } from "./../../assets/icon/header/logo-hrcore.svg";
import UkFlag from "./../../assets/icon/header/uk-flag.svg";
import UkraineFlag from "./../../assets/icon/header/ukraine-flag.svg";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack } from "react-icons/io";
import LanguageSwitcherPanel from "../../UI-components/languageSwitcherPanel/LanguageSwitcherPanel";
import LanguageSwitcher from "../../UI-components/languageSwitcher/LanguageSwitcher";

const Header = () => {
  console.log(localStorage.getItem("token"));
  const state = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ...actions } = authSlice.actions;

  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState("English");

  const [selectedLanguageData, setSelectedLanguageData] = useState({
    id: 1,
    flag: UkFlag,
    name: "English",
    value: "en",
  });
  const [languagesIsOpen, setLanguagesIsOpen] = useState(false);
  const languagesData = [
    { id: 1, flag: UkFlag, name: "English", value: "en" },
    { id: 2, flag: UkraineFlag, name: "Ukrainian", value: "ua" },
  ];

  const handleOpen = (bool) => {
    let result = bool === true ? false : true;
    setLanguagesIsOpen(result);
  };
  const handleSelectLanguage = (id, flag, name, value) => {
    let data = { id, flag, name, value };
    setLanguagesIsOpen(false);
    setSelectedLanguageData(data);
    i18n.changeLanguage(value);
  };



  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(actions.logOut());
    navigate("/login");
  };
  useEffect(() => {
    if (state.token === null) {
      navigate("/login");
    }
  }, [state.getLogout.success]);

  return (
    <div className={s.header}>
      <div className={s.header__wrapper}>
        <div className={s.header__logo}>
          <NavLink to={"/"} className={s.header__logoLink}>
            <div className={s.header__logoWrapperCreate}>
              <Logo className={s.header__logoCreate} />
            </div>
          </NavLink>
        </div>
        <div className={s.header__blockWrapper}>
          <div className={s.header__userBlock}>
            <LanguageSwitcher
              className={s.languageSwitcher}
              onClickSwitcher={() => handleOpen(languagesIsOpen)}
              selectedLanguageData={selectedLanguageData}
              languagesIsOpen={languagesIsOpen}
              languagesData={languagesData}
              onClickPanelItem={(id, flag, name, value) =>
                handleSelectLanguage(id, flag, name, value)
              }
            />
            <div className={s.line}></div>
            {state.token ? (
              <div className={s.header__avatarWrapper}>
                <button className={s.button} onClick={() => logOut()}>
                  <IoIosLogOut color="#333333" size={30} className={s.icon} />
                  <div className={s.title}>{t("header.logout")}</div>
                </button>
              </div>
            ) : (
              "No token"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
