import React from 'react';
import s from './SearchInput.module.scss';

const SearchInput = (props) => {
    return (
        <>
            <div className={s.searchWrapper}>
                <label className={s.label}>
                    {props.label}
                </label>
                <input 
                    className={s.input} 
                    onChange={props.onChange}
                    type='search'
                    placeholder={props.placeholder}
                    value={props.value}
                    style={{border: props.border, width: props.width}}>        
                 </input>
            </div>
        </>
    );
}

export default SearchInput;
