import React from "react";
import s from './LanguageSwitcher.module.scss';
import { IoIosArrowBack } from "react-icons/io";
import LanguageSwitcherPanel from "../languageSwitcherPanel/LanguageSwitcherPanel";

const LanguageSwitcher = (props) => {

    const { onClickSwitcher, selectedLanguageData, languagesIsOpen, languagesData, onClickPanelItem} = props;

  return (
    <>
      <div
        className={s.languagesSwitcher}
        onClick={onClickSwitcher}
      >
        <div className={s.languageBlock}>
          <img
            className={s.flagImg}
            src={selectedLanguageData.flag}
            alt="Flag"
          />
          <div>{selectedLanguageData.name}</div>
        </div>
        <IoIosArrowBack
          className={
            languagesIsOpen ? `${s.arrow} ${s.arrowDeg}` : `${s.arrow}`
          }
          size={15}
        />
        <div className={s.selectPanel}>
          {languagesData.map((i) => (
            <LanguageSwitcherPanel
              className={s.languageSwitcherPanel}
              onClick={() =>
                onClickPanelItem(i.id, i.flag, i.name, i.value)
              }
              isOpen={languagesIsOpen}
              key={i.id}
              flag={i.flag}
              name={i.name}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default LanguageSwitcher;
