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

  const [currentPass, setCurrentPass] = useState();
  const [newPass, setNewPass] = useState();
  const [repeatPass, setRepeatPass] = useState();

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


  const compare = () => {
    const newPass = watch('newPass')
    const repeatPass = watch('repeatPass')
    return newPass === repeatPass ? false : true
  }
  const compareDirty = () => {
    const newPassDirty = dirtyFields.newPass
    const repeatPassDirty = dirtyFields.repeatPass
    return newPassDirty && repeatPassDirty === true ? true : false
  }
  const validSamePass = compare();
  const validDirtyPass = compareDirty();
  useEffect(() => {
    compare()
  }, [watch('newPass'),watch('repeatPass')])
  console.log(validSamePass)

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
            <div className={s.errors} style={{color: red}}>{validSamePass && validDirtyPass && isValid === true ? 'Passwords are different' : ''}</div>
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
            disabled={!isValid === true ? 'true' : validSamePass === false ? 'false' : 'true'}
            justContent={"left"}
            onClick={() => console.log('click')}
            // isLoading={state.addCandidate.loading}
          />
        </form>
      </div>
    </>
  );
};

export default UpdatePassword;
