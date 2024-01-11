import React from 'react';
import s from './ModalWindow.module.scss';
import { ReactComponent as Close } from '../../assets/icon/jobs/vacancy/close.svg';
import MyButton from '../button/MyButton';

const ModalWindow = (props) => {
    return (
        <>
            <div className={s.modalWindow}>
                <div className={s.content}>
                    <Close className={s.closeBtn} onClick={props.closedModal}/>
                    <div className={s.header}>
                        <div className={s.title}>{props.headerTitle}</div>
                        <div className={s.headerLine}></div>
                    </div>
                    <div className={s.main}>
                        {props.children}
                    </div>
                    <div className={s.footer}>
                        <div className={s.footerLine}></div>
                        <MyButton 
                            className={s.button}
                            onClick={props.onClick}
                            title={props.title}
                            displayIcon={props.displayIcon}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalWindow;
