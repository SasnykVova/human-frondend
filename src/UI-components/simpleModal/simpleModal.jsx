import React from 'react';
import s from './simpleModal.module.scss';
import MyButton from '../button/MyButton';
import Loader from '../loader/Loader';


const SimpleModal = (props) => {
    return (
        <div>
            {props.isSuccess &&
                <div className={s.modal}>
                    <div className={s.content} style={{ width: props.width, height: props.height }}>
                        <div className={s.form}>
                            <div>
                                {props.children}
                            </div>
                            {props.isLoading ?
                                <Loader />
                                :
                                <div className={s.wrapperBtn}>
                                    <MyButton onClick={props.onClickBtn} className={s.createJobModal__btn} bg={'#3ed65d'} fontSize={props.fontSize} title={props.titleButton} />
                                    <MyButton onClick={props.onClickBtn2} className={s.createJobModal__btn} bg={'#c72626'} fontSize={props.fontSize} title={props.titleButton2} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default SimpleModal;
