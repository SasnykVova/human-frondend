import React from "react";
import s from "./Select.module.scss";

const Select = (props) => {
  return (
    <>
      <div className={s.select}>
        <label className={s.label}>{props.label}</label>
        <select className={s.select} onChange={props.onChangeSelect} value={props.value}>
            <option className={s.option} value='Male'>Male</option>
            <option className={s.option} value='Female'>Female</option>
            <option className={s.option} value='Another'>Another</option>
        </select>
      </div>
    </>
  );
};

export default Select;
