import React, { useEffect, useState } from "react";
import s from "./AddEmployee.module.scss";
import AddJobInput from "../../jobs/activeJobs/addJobInput/AddJobInput";
import { useTranslation } from "react-i18next";
import Select from "../../../UI-components/select/Select";
import MyInput from "../../../UI-components/input/MyInput";
import MyButton from "../../../UI-components/button/MyButton";
import Loader from "../../../UI-components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  employeesSlice,
  addUser,
} from "../../../toolkitRedux/reducer/employeesSlice";
import { useNavigate } from "react-router";
import { FormProvider, useForm } from "react-hook-form";


const AddEmployee = () => {
  const { t } = useTranslation();
  const state = useSelector((state) => state.employeesPage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const actions = employeesSlice.actions;

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [surname, setSurname] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [birthDate, setBirthDate] = useState();
  const [address, setAddress] = useState();
  const [startDate, setStartDate] = useState();
  const [department, setDepartment] = useState();
  const [position, setPosition] = useState();
  const [role, setRole] = useState("User");
  const [gender, setGender] = useState("Male");

  const selectData = [
    { id: 1, value: "Admin" },
    { id: 2, value: "User" },
  ];
  const selectDataGender = [
    { id: 1, value: "Male" },
    { id: 2, value: "Female" },
    { id: 3, value: "Another" },
  ];

  useEffect(() => {
    if (state.addUser.success) {
      navigate("/employees");
      dispatch(actions.setAddEmployeeFalse());
    }
  }, [state.addUser.success]);

  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });
  const submit = (data) => {
    const {name, position, birthDate, department, surname, mobileNumber, address, email, startDate} = data;
    dispatch(addUser({name, position, birthDate, department, surname, mobileNumber, address, email, startDate, role, gender}))
    reset();
  };

  return (
    <>
      <div className={s.addEmployee}>
        <form className={s.wrapper} onSubmit={handleSubmit(submit)}>
          <h1 className={s.title}>Adding a new employee</h1>
          <div className={s.personalInfoBlock}>
            <h3 className={s.subTitle}>Personal information</h3>
            <div className={s.twoInput}>
            <AddJobInput
              label={t("addCandidate.name")}
              name={'name'}
              register={register}
              errors={errors}
              validation={t("validation.required")}
            />
            <AddJobInput
              label={t("addCandidate.surname")}
              name={'surname'}
              register={register}
              errors={errors}
              validation={t("validation.required")}
            />
            </div>
            <div className={s.twoInput}>
              <Select
                className={s.input}
                data={selectDataGender}
                label={t("addCandidate.genderTitle")}
                value={gender}
                onChangeSelect={(value) => setGender(value)}
              >
                <div className={s.errorsWrapper}></div>
              </Select>
              <MyInput
                label={t("addCandidate.birthDate")}
                name={'birthDate'}
                register={register}
                errors={errors}
                validation={t("validation.required")}
                type={'date'}
              />
            </div>
          </div>
          <div className={s.contactInfoBlock}>
            <h3 className={s.subTitle}>{t("addCandidate.contactInfo")}</h3>
            <div className={s.twoInput}>
            <AddJobInput
              label={t("addCandidate.email")}
              name={'email'}
              register={register}
              errors={errors}
              validation={t("validation.email")}
              pattern={/^\S+@\S+\.\S+$/}
            />
              <MyInput
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
                label={t("addEmployee.department")}
                name={'department'}
                register={register}
                errors={errors}
              />
            <AddJobInput
                label={t("addCandidate.position")}
                name={'position'}
                register={register}
                errors={errors}
              />
            </div>
            <div className={s.twoInput}>
              <Select
                data={selectData}
                className={s.input}
                label={"Role"}
                onChangeSelect={(value) => setRole(value)}
                value={role}
              ><div className={s.errorsWrapper}></div>
              </Select>
              <MyInput
                label={t("addEmployee.startDate")}
                name={'startDate'}
                register={register}
                errors={errors}
                type={'date'}
              />
            </div>
          </div>
          <MyButton
            className={s.button}
            title={
              state.addUser.loading ? (
                <Loader width={"30px"} height={"30px"} />
              ) : (
                "Add"
              )
            }
            disabled={!isValid && "true"}
            justContent={"left"}
          />
        </form>
      </div>
    </>
  );
};

export default AddEmployee;
