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

const AddCandidate = () => {

  const { t } = useTranslation();   
  const dispatch = useDispatch();
  const state = useSelector(state => state.candidatesPage);
  const navigate = useNavigate();
  const actions = candidatesSlice.actions;

  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [gender, setGender] = useState("Male");
  const [birthDate, setBirthDate] = useState();
  const [email, setEmail] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [address, setAddress] = useState();
  const [position, setPosition] = useState();
  const [salary, setSalary] = useState();

  const selectData = [
    {id: 1, value: 'Male'},
    {id: 2, value: 'Female'},
    {id: 3, value: 'Another'},
  ]
  
  const handleSumbit = () => {
         dispatch(addCandidate({name, surname, gender, birthDate, email, mobileNumber, address, position, salary}))
  }
  useEffect(() => {
    if(state.addCandidate.success) {
        navigate('/candidates')
        dispatch(actions.setAddCandidateSuccessFalse())
    }
  }, [state.addCandidate.success])

  return (
    <>
      <div className={s.addCandidate}>
        <div className={s.wrapper}>
          <h1 className={s.title}>{t("addCandidate.title")}</h1>
          <div className={s.personalInfoBlock}>
            <h3 className={s.subTitle}>{t("addCandidate.personalInfo")}</h3>
            <div className={s.twoInput}>
              <AddJobInput
                className={s.input}
                label={t("addCandidate.name")}
                onChange={(value) => setName(value)}
                value={name}
              />
              <AddJobInput
                className={s.input}
                label={t("addCandidate.surname")}
                onChange={(value) => setSurname(value)}
                value={surname}
              />
            </div>
            <div className={s.twoInput}>
              <Select
                className={s.input}
                data={selectData}
                label={t("addCandidate.genderTitle")}
                value={gender}
                onChangeSelect={(value) => setGender(value)}
              />
              <MyInput
                className={s.input}
                onChange={(value) => setBirthDate(value)}
                value={birthDate}
                type={"date"}
                label={t("addCandidate.birthDate")}
              />
            </div>
          </div>
          <div className={s.contactInfoBlock}>
            <h3 className={s.subTitle}>{t("addCandidate.contactInfo")}</h3>
            <div className={s.twoInput}>
              <AddJobInput
                className={s.input}
                onChange={(value) => setEmail(value)}
                value={email}
                label={t("addCandidate.email")}
              />
              <MyInput
                className={s.input}
                onChange={(value) => setMobileNumber(value)}
                value={mobileNumber}
                label={t("addCandidate.mobile")}
                type={'number'}
              />
            </div>
            <div className={s.twoInput}>
              <AddJobInput
                className={s.input}
                onChange={(value) => setAddress(value)}
                value={address}
                label={t("addCandidate.location")}
                widthInput={"809px"}
              />
            </div>
          </div>
          <div className={s.workInfoBlock}>
            <h3 className={s.subTitle}>{t("addCandidate.workInfo")}</h3>
            <div className={s.twoInput}>
              <AddJobInput
                className={s.input}
                onChange={(value) => setPosition(value)}
                value={position}
                label={t("addCandidate.position")}
              />
              <MyInput
                className={s.input}
                onChange={(value) => setSalary(value)}
                value={salary}
                label={t("addCandidate.salary")}
                type={"number"}
              />
            </div>
          </div>
          <MyButton
            className={s.button}
            title={state.addCandidate.loading ? <Loader width={'30px'} height={'30px'}/> : t("addCandidate.create")}
            justContent={"left"}
            onClick={handleSumbit}
            isLoading={state.addCandidate.loading}
          />
        </div>
      </div>
    </>
  );
};

export default AddCandidate;
