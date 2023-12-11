import React, { useEffect } from 'react';
import s from "./login.module.scss";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { isAuthAC , loginAC, passwordAC, getLogin } from '../../toolkitRedux/authtoolkitReducer'
import  { authSlice, getLogin } from '../../toolkitRedux/reducer/authSlice';
import Loader from '../../UI-components/loader/Loader';


function Login(props) {
    const state = useSelector(state => state.auth)
    const {...actions } = authSlice.actions
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(state.email, state.password)

    let email = state.email
    let password = state.password
    console.log(state)

    const handlesubmit = (e) => {
        e.preventDefault()
        dispatch(getLogin({ email, password }))
        actions.loginAC("")
        actions.passwordAC("")
        console.log(state.email, state.password)
    }

    useEffect(() => {
        if (state.getLogin.success) {
            navigate('/')
        }
    }, 
    [state.getLogin.success])

    return (
        <div className={s.login}>
            <div className={s.login__line}></div>
            <div className={s.login__wrapper}>
                <div className={s.login__title}>Login</div>
                <form onSubmit={handlesubmit} action="" className={s.login__form}>
                    <input onChange={(e) => dispatch(actions.loginAC(e.target.value))} value={state.login} type="text" className={s.login__input} />
                    <input onChange={(e) => dispatch(actions.passwordAC(e.target.value))} type="password" value={state.password} className={s.login__input} />
                    <div className={s.login__checkBox}>
                        <input type="checkbox" className={s.login__inputRememberMe} />
                        <label className={s.login__labelCB}>Remember me</label>
                    </div>
                    <button className={s.login__btn}>{state.getLogin.loading ? 
                    <Loader/>
                    :
                    'Log in'}</button>
                </form>
            </div>
            <NavLink to={"login/registration"}>
                <div className={s.login__registration}>I don't have an account.</div>
            </NavLink>
        </div>
    );
}

export const myStorage = window.localStorage
export default Login;