import React, { useEffect, useState } from "react";
import s from "./Navbar.module.scss";
import "./Navbar.scss";
import ShortMenu from "./shortMenu/ShortMenu";
import Menu from "./menu/menu";
import { useDispatch, useSelector } from "react-redux";
import { candidatesSlice } from "../../toolkitRedux/reducer/candidatesSlice";
import MenuDesktop from "./menuDesktop/MenuDesktop";

const Navbar = () => {
//   const [menuActive, setMenuActive] = useState(true);
  const state = useSelector((state) => state.candidatesPage);
  const dispatch = useDispatch();
  const actions = candidatesSlice.actions;
  console.log(state.navBar.isOpen);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Прибрати слухач подій при видаленні компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={s.navbar}>
        {windowWidth > 766 ? 
      <div
        onClick={() => dispatch(actions.setNavBarIsOpen(!state.navBar.isOpen))}
        className={s.burgerBtn}
      >
        <span className={s.burgerBtn__middleLine}></span>
      </div>
      :
      <div
        onClick={() => dispatch(actions.setMobileNavBarIsOpen(!state.navBar.mobileIsOpen))}
        className={s.burgerBtn}
      >
        <span className={s.burgerBtn__middleLine}></span>
      </div>
}
      {state.navBar.isOpen && windowWidth > 766 ? (
        <MenuDesktop/>
      ) : state.navBar.mobileIsOpen ? (
        <Menu
      menuActive={state.navBar.isOpen}
      onClick={() =>
        dispatch(actions.setMobileNavBarIsOpenFalse())
      }
    />
      ) : (
        <ShortMenu/>
      )}
    </div>
  );
};

export default Navbar;
