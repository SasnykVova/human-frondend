import React, { useEffect, useState } from "react";
import s from './LanguageSwitcher.module.scss';
import { IoIosArrowBack } from "react-icons/io";
import LanguageSwitcherPanel from "../languageSwitcherPanel/LanguageSwitcherPanel";

const LanguageSwitcher = React.memo(({onClickSwitcher, selectedLanguageData, languagesIsOpen, languagesData, onClickPanelItem}) => {
  console.log('LanguageSwitcher');

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
    <>
      <div
        className={s.languagesSwitcher}
        onClick={onClickSwitcher}
      >
        <div className={s.languageBlock}>
          {windowWidth > 766 ?
          <div className={s.wrapperSelect}>
            <img
              className={s.flagImg}
              src={selectedLanguageData.flag}
              alt="Flag"
            />
            <div>{selectedLanguageData.name}</div>
          </div>
          :
          <div className={s.wrapperSelect}>
          <img
            className={s.flagImg}
            src={selectedLanguageData.flag}
            alt="Flag"
          />
          </div>
}
        </div>
        <IoIosArrowBack
          className={
            languagesIsOpen ? `${s.arrow} ${s.arrowDeg}` : `${s.arrow}`
          }
          size={15}
        />
        {languagesIsOpen ? 
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
        :
        ''
        }
      </div>
    </>
  );
});

export default LanguageSwitcher;
