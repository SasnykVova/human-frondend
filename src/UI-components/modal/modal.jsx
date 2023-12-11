import React from 'react';
import s from './modal.module.scss';
import MyButton from '../button/MyButton';
import { ReactComponent as Close } from '../../assets/icon/jobs/vacancy/close.svg';

const Modal = ({ ...props }) => {
    return (
        <div className={s.modal}>
            <div className={s.content} style={{width: props.width, height: props.height}}>
                <Close className={s.closeBtn} onClick={props.onClick} width={'60px'} height={'60px'} style={{display: props.display}}/>
                <div className={s.form}>
                    <div className={s.title}>{props.title}</div>
                    <div className={s.wrapper} style={{flexDirection: props.displeyChild, justifyContent: props.justifyContentChild, 
                        gap: props.gapChild, alignItems: props.alignItemsChild, textAlign: props.textAlignChild, fontSize: props.fzChild,
                        }}>
                        {props.children}
                    </div>
                    {props.textError}
                    <div className={s.wrapperBtn}>
                        <MyButton onClick={props.onClickBtn} className={s.createJobModal__btn} fontSize={props.fontSize} title={props.titleButton} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
