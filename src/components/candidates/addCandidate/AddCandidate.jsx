import React, { useEffect, useState } from "react";
import s from "./AddCandidate.module.scss";
import AddJobInput from "../../jobs/activeJobs/addJobInput/AddJobInput";
import Select from "../../../UI-components/select/Select";
import MyInput from "../../../UI-components/input/MyInput";
import MyButton from "../../../UI-components/button/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { addCandidate, candidatesSlice } from "../../../toolkitRedux/reducer/candidatesSlice";
import Loader from "../../../UI-components/loader/Loader";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

const AddCandidate = () => {

  const { t } = useTranslation();   
  const dispatch = useDispatch();
  const state = useSelector(state => state.candidatesPage);
  const navigate = useNavigate();
  const actions = candidatesSlice.actions;

  const [gender, setGender] = useState("Male");

  const selectData = [
    {id: 1, value: 'Male'},
    {id: 2, value: 'Female'},
    {id: 3, value: 'Another'},
  ]
  
  useEffect(() => {
    if(state.addCandidate.success) {
        navigate('/candidates')
        dispatch(actions.setAddCandidateSuccessFalse())
    }
  }, [state.addCandidate.success])

  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });
  const submit = (data) => {
    const { name, surname, birthDate, email, mobileNumber, address, position, salary } = data;
    dispatch(addCandidate({name, surname, gender, birthDate, email, mobileNumber, address, position, salary}))
    reset();
  };

  return (
    <>
      <div className={s.addCandidate}>
        <form className={s.wrapper} onSubmit={handleSubmit(submit)}>
          <h1 className={s.title}>{t("addCandidate.title")}</h1>
          <div className={s.personalInfoBlock}>
            <h3 className={s.subTitle}>{t("addCandidate.personalInfo")}</h3>
            <div className={s.twoInput}>
              <AddJobInput
                className={s.input}
                label={t("addCandidate.name")}
                name={'name'}
                register={register}
                errors={errors}
              />
              <AddJobInput
                className={s.input}
                label={t("addCandidate.surname")}
                name={'surname'}
                register={register}
                errors={errors}
              />
            </div>
            <div className={s.twoInput}>
              <Select
                className={s.input}
                data={selectData}
                label={t("addCandidate.genderTitle")}
                value={gender}
                onChangeSelect={(value) => setGender(value)}
              ><div className={s.errorsWrapper}></div>
              </Select>
              <MyInput
                className={s.input}
                label={t("addCandidate.birthDate")}
                name={'birthDate'}
                register={register}
                errors={errors}
                type={'date'}
              />
            </div>
          </div>
          <div className={s.contactInfoBlock}>
            <h3 className={s.subTitle}>{t("addCandidate.contactInfo")}</h3>
            <div className={s.twoInput}>
              <AddJobInput
                className={s.input}
                label={t("addCandidate.email")}
                name={'email'}
                register={register}
                errors={errors}
                validation={t("validation.email")}
               pattern={/^\S+@\S+\.\S+$/}
              />
              <MyInput
                className={s.input}
                label={t("addCandidate.mobile")}
                name={'mobileNumber'}
                register={register}
                errors={errors}
                validation={t("validation.mobileNumber")}
                type={"number"}
                pattern={/^380\d{9}$/}
              />
            </div>
            <div className={s.twoInput}>
              <AddJobInput
                className={s.input}
                label={t("addCandidate.location")}
                name={'address'}
                register={register}
                errors={errors}
                widthInput={'809px'}
              />
            </div>
          </div>
          <div className={s.workInfoBlock}>
            <h3 className={s.subTitle}>{t("addCandidate.workInfo")}</h3>
            <div className={s.twoInput}>
              <AddJobInput
                className={s.input}
                label={t("addCandidate.position")}
                name={'position'}
                register={register}
                errors={errors}
              />
              <MyInput
                className={s.input}
                label={t("addCandidate.salary")}
                name={'salary'}
                register={register}
                errors={errors}
                type={"number"}
              />
            </div>
          </div>
          <MyButton
            className={s.button}
            title={state.addCandidate.loading ? <Loader width={'30px'} height={'30px'}/> : t("addCandidate.create")}
            justContent={"left"}
            isLoading={state.addCandidate.loading}
            disabled={!isValid && "true"}
          />
        </form>
      </div>
    </>
  );
};

export default AddCandidate;
