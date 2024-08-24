import React from 'react';
import s from './Register.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { registerSlice, setRegister } from '../../toolkitRedux/reducer/registerSlice';

const Register = () => {
    
    const state = useSelector(state => state.registerPage);
    const dispatch = useDispatch();
    const { setName, setSurname, setEmail, setPassword } = registerSlice.actions;
    
    const handlesubmit = (e) => {
        e.preventDefault();
        setRegister(state.name, state.surname, state.email, state.password)
    }

    return (
        <div className={s.register}>
            <div className={s.register__wrapper}>
                <h1 className={s.register__title}>Register</h1>
                <form onSubmit={handlesubmit} className={s.register__form}>
                    <div className={s.register__labelInput}>
                        <label className={s.register__label}>Name</label>
                        <input onChange={(e) => {dispatch(setName(e.target.value))}} value={state.name} type="text" className={s.register__input} />
                    </div> 
                    <div className={s.register__labelInput}>
                        <label className={s.register__label}>Surname</label>
                        <input onChange={(e) => {dispatch(setSurname(e.target.value))}} value={state.surname} type="text" className={s.register__input} />
                    </div>
                    <div className={s.register__labelInput}>
                        <label className={s.register__label}>Email</label>
                        <input onChange={(e) => {dispatch(setEmail(e.target.value))}} value={state.email} type="text" className={s.register__input} />
                    </div>
                    <div className={s.register__labelInput}>
                        <label className={s.register__label}>Password</label>
                        <input onChange={(e) => {dispatch(setPassword(e.target.value))}} value={state.password} type="password" className={s.register__input} />
                    </div>
                    <button className={s.register__btn}>Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
