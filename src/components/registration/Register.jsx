import React from 'react';
import s from './Register.module.scss';

const Register = (props) => {
    
    
    const handlesubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className={s.register}>
            <div className={s.register__wrapper}>
                <h1 className={s.register__title}>Register</h1>
                <form onSubmit={handlesubmit} className={s.register__form}>
                    <div className={s.register__labelInput}>
                        <label className={s.register__label}>Name</label>
                        <input onChange={(e) => {props.newNameTextAC(e.target.value)}} value={props.name} type="text" className={s.register__input} />
                    </div> 
                    <div className={s.register__labelInput}>
                        <label className={s.register__label}>Surname</label>
                        <input onChange={(e) => {props.newSurnameTextAC(e.target.value)}} value={props.surname} type="text" className={s.register__input} />
                    </div>
                    <div className={s.register__labelInput}>
                        <label className={s.register__label}>Email</label>
                        <input onChange={(e) => {props.newEmailTextAC(e.target.value)}} value={props.email} type="text" className={s.register__input} />
                    </div>
                    <div className={s.register__labelInput}>
                        <label className={s.register__label}>Password</label>
                        <input onChange={(e) => {props.newPasswordTextAC(e.target.value)}} value={props.password} type="password" className={s.register__input} />
                    </div>
                    <button className={s.register__btn}>Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
