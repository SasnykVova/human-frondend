import React from 'react';
import s from "./Login.module.scss";
import { NavLink } from 'react-router-dom';

function Login() {
    return (
        <div className={s.login}>
            <div className={s.login__line}></div>
            <div className={s.login__wrapper}>
                <div className={s.login__title}>Login</div>
                <form action="" className={s.login__form}>
                    <input type="text" className={s.login__input} />
                    <input type="password" className={s.login__input} />
                    <div className={s.login__checkBox}>
                        <input type="checkbox" className={s.login__inputRememberMe} />
                        <label className={s.login__labelCB}>Remember me</label>
                    </div>
                    <button className={s.login__btn}>Log in</button>
                </form>
            </div>
            <NavLink to={"registration"}>
                <div className={s.login__registration}>I don't have an account.</div>
            </NavLink>
        </div>
    );
}

export default Login;