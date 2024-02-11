import React, { useEffect } from "react";
import s from "./login.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { isAuthAC , loginAC, passwordAC, getLogin } from '../../toolkitRedux/authtoolkitReducer'
import { authSlice, getLogin } from "../../toolkitRedux/reducer/authSlice";
import Loader from "../../UI-components/loader/Loader";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Input from "../../UI-components/input/input/Input";

function Login(props) {
  const { t } = useTranslation();
  const state = useSelector((state) => state.auth);
  const { ...actions } = authSlice.actions;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let email = state.email;
  let password = state.password;


  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(getLogin({ email, password }));
    actions.loginAC("");
    actions.passwordAC("");
    console.log(state.email, state.password);
  };

  useEffect(() => {
    if (state.getLogin.success) {
      dispatch(actions.setLoginSuccess());
      navigate("/");
    }
  }, [state.getLogin.success]);

  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
    watch,
  } = useForm({
    mode: "onChange",
  });
  const submit = (data) => {
    const { email, password } = data;
    dispatch(getLogin({ email, password }));
    reset();
  };

  return (
    <div className={s.login}>
      <div className={s.login__line}></div>
      <div className={s.login__wrapper}>
        <div className={s.login__title}>{t("login.title")}</div>
        <form className={s.login__form} onSubmit={handleSubmit(submit)}>
          <div className={s.inputWrapper}>
            <Input
              className={s.login__input}
              label={t("login.email")}
              name={"email"}
              register={register}
              errors={errors}
              validation={t("validation.email")}
              pattern={/^\S+@\S+\.\S+$/}
            />
          </div>
          <div className={s.inputWrapper}>
          <Input
              className={s.input}
              label={t("login.password")}
              name={'password'}
              register={register}
              errors={errors}
              type={'password'}
              pattern={/^(?=.*[A-Za-z])(?=.*\d).{8,}$/}
              validation={t("validation.password")}
              minLength={8}
              validationLength={t("validation.minLength")}
            />
          </div>
          <button 
            className={isValid ? `${s.login__btn}` : `${s.login__btn} ${s.btnDisapled}`}
            style={{background: state.getLogin.loading ? '#377DFF' : ''}}
            disabled={!isValid && true}
            >
            {state.getLogin.loading ? <Loader /> : `${t("login.login")}`}
          </button>
        </form>
        <NavLink to={"login/registration"}>
          <div className={s.login__registration}>I don't have an account.</div>
        </NavLink>
      </div>
    </div>
  );
}

export const myStorage = window.localStorage;
export default Login;
