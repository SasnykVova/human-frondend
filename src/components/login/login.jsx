import React from 'react';
import s from "./login.module.scss";

function Login() {
    return (
        <div className={s.login}>
            <div className={s.login__wrapper}>
                <form action="" className={s.login__form}>
                    <input type="text" className={s.login__inputLogin}/>
                    <input type="text" className={s.login__inputPass}/>
                    <input type="checkbox" className={s.login__inputRememberMe}/>
                    <button className={s.login__btn}>Log in</button>
                </form>
            </div>
        </div>
    );
}

export default Login;