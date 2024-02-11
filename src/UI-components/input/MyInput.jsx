import React from "react";
import s from "./MyInput.module.scss";
import { useTranslation } from "react-i18next";

const MyInput = (props) => {
    const { label, name, register, errors, validation, pattern } = props;
    const { t } = useTranslation();
  return (
    <label className={s.addJobInput} for="datePickerBlock">
      <label className={s.addJobInput__label}>{label}</label>
      <input
        className={s.addJobInput__textarea}
        id="datePickerBlock"
        type={props.type}
        // onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
        {...register(name, { 
            required: `${t("validation.required")}`,
            pattern: {
                value: pattern,
                message: validation,
              } 
        })}
      ></input>
      <div className={s.errorsWrapper}>
      {errors[name] && <p className={s.errors}>{errors[name]?.message}</p>}
      </div>
    </label>
  );
};
export default MyInput;
