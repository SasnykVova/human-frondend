import React from "react";
import s from './LanguageSwitcherPanel.module.scss';


const LanguageSwitcherPanel = (props) => {

  const {flag, name, isOpen, onClick} = props;

  return (
    <>
    {isOpen &&
      <div className={s.languageSwitcherPanel} onClick={onClick}>
        <img className={s.flagImg} src={flag} alt="Flag" />
        <div className={s.countryName}>{name}</div>
      </div>
}
    </>
  );
}

export default LanguageSwitcherPanel;

