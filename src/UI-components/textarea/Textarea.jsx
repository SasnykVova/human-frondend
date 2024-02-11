import React from 'react';
import s from './Textarea.module.scss';
import { useTranslation } from 'react-i18next';

const Textarea = (props) => {
    const { label, name, register, errors, validation, pattern } = props;
    const { t } = useTranslation();
    return (
        <>
            <div className={s.textareaWrapper}>
            <label className={s.label}>{label}</label>
            <textarea 
                className={s.textarea} 
                style={{minWidth: window.innerWidth > 1200 ? props.widthInput : '100%', 
                height: window.innerWidth > 1200 ? props.heightInput : '100px',
                border: errors?.[name] && "1px solid red",
                boxShadow: errors?.[name] && "0 0 0 1px red"}} 
                type='text'
                {...register(name, { 
                    required: `${t("validation.required")}`,
                    pattern: {
                        value: pattern,
                        message: validation,
                      } 
                })}
            > 
            </textarea>
            <div className={s.errorsWrapper}>
        {errors[name] && <p className={s.errors}>{errors[name]?.message}</p>}
      </div>
        </div>
        </>
    );
}

export default Textarea;
