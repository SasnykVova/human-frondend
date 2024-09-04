import React, { useEffect, useState } from "react";
import s from "./UpdatePassword.module.scss";
import AddJobInput from "../../jobs/activeJobs/addJobInput/AddJobInput";
import { useTranslation } from "react-i18next";
import MyButton from "../../../UI-components/button/MyButton";
import { useForm } from "react-hook-form";
import Loader from "../../../UI-components/loader/Loader";
import { useSelector } from "react-redux";
import { red } from "@mui/material/colors";

const UpdatePassword = () => {
  
  const { t } = useTranslation();
  const state = useSelector(state => state.profilePage);

  const {
    register,
    formState: { errors, isValid, dirtyFields, isFocus },
    reset,
    handleSubmit,
    watch,
  } = useForm({
    mode: "onChange",
  });
  const submit = (data) => {
    // const { name, surname, birthDate, email, mobileNumber, address, position, salary } = data;
    reset();
  };

  const newPass = watch('newPass');
  const repeatPass = watch('repeatPass');
  const passwordsMatch = newPass === repeatPass;

  const isBothFieldsDirty = dirtyFields.newPass && dirtyFields.repeatPass;

  return (
    <>
      <div className={s.updatePassword} onSubmit={handleSubmit(submit)}>
        <form className={s.wrapper}>
          <div className={s.inputBlock}>
            <AddJobInput
              className={s.input}
              label={t("profile.passwordOld")}
              name={'currentPass'}
              register={register}
              errors={errors}
              type={'password'}
              pattern={/^(?=.*[A-Za-z])(?=.*\d).{8,}$/}
              validation={t("validation.password")}
              minLength={8}
              validationLength={t("validation.minLength")}
            />
            <AddJobInput
              className={s.input}
              label={t("profile.passwordNew")}
              name={'newPass'}
              register={register}
              errors={errors}
              type={'password'}
              pattern={/^(?=.*[A-Za-z])(?=.*\d).{8,}$/}
              validation={t("validation.password")}
              minLength={8}
              validationLength={t("validation.minLength")}
            />
            <AddJobInput
              className={s.input}
              label={t("profile.passwordNewAgain")}
              name={'repeatPass'}
              register={register}
              errors={errors}
              type={'password'}
              pattern={/^(?=.*[A-Za-z])(?=.*\d).{8,}$/}
              validation={t("validation.password")}
              minLength={8}
              validationLength={t("validation.minLength")}
            />
            {isBothFieldsDirty && !passwordsMatch && (
            <div className={s.errors} style={{ color: red }}>
              Password are different
            </div>
          )}
          </div>
          <MyButton
            className={s.button}
            title={
              state?.addCandidate?.loading ? (
                <Loader width={"30px"} height={"30px"} />
              ) : (
                t("profile.update")
              )
            }
            disabled={!isValid || !passwordsMatch ? 'true': ''} 
            justContent={"left"}
            onClick={() => console.log('click')}
          />
        </form>
      </div>
    </>
  );
};

export default UpdatePassword;
