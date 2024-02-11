import React from "react";
import s from "./Select.module.scss";

const Select = (props) => {


  return (
    <>
      <div className={s.select}>
        <label className={s.label}>{props.label}</label>
        <select className={s.select} onChange={(e) => props.onChangeSelect(e.target.value)} value={props.value}>
          {props.data?.map(o => <option className={s.option} key={o.id} value={o.value}>{o.value}</option>)}
        </select>
        {props.children}
      </div>
    </>
  );
};

export default Select;
