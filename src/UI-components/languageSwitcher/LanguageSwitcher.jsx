import React, { useCallback, useEffect, useMemo, useState } from "react";
import s from './LanguageSwitcher.module.scss';
import { IoIosArrowBack } from "react-icons/io";
import LanguageSwitcherPanel from "../languageSwitcherPanel/LanguageSwitcherPanel";

const LanguageSwitcher = ({onClickSwitcher, selectedLanguageData, languagesIsOpen, languagesData, onClickPanelItem}) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const memoizedOnClickSwitcher = useCallback(() => {
      onClickSwitcher();
    }, [onClickSwitcher]);

    const memoizedOnClickPanelItem = useCallback((id, flag, name, value) => {
      onClickPanelItem(id, flag, name, value);
    }, [onClickPanelItem]);

    const memoizedLanguagesData = useMemo(() => languagesData, [languagesData]);


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
        onClick={memoizedOnClickSwitcher}
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
          {memoizedLanguagesData.map((i) => (
            <LanguageSwitcherPanel
              className={s.languageSwitcherPanel}
              onClick={() =>
                memoizedOnClickPanelItem(i.id, i.flag, i.name, i.value)
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
};

export default React.memo(LanguageSwitcher);


