import React, { useEffect, useState } from "react";
import s from "./AddingVacancy.module.scss";
import { useTranslation } from "react-i18next";
import AddJobInput from "../activeJobs/addJobInput/AddJobInput";
import MyButton from "../../../UI-components/button/MyButton";
import Loader from "../../../UI-components/loader/Loader";
import Textarea from "../../../UI-components/textarea/Textarea";
import { useDispatch, useSelector } from "react-redux";
import { addJob, jobsSlice } from "../../../toolkitRedux/reducer/jobsSlice";
import MyInput from "../../../UI-components/input/MyInput";
import { useNavigate } from "react-router";

const AddingVacancy = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector(state => state.jobsPage)
  const navigate = useNavigate();
  const actions = jobsSlice.actions;

  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const assignedTo = {
    surname: localStorage.getItem("surname"),
    name: localStorage.getItem("name"),
    id: localStorage.getItem("id"),
  };
  const [salaryMax, setSalaryMax] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");

  const addJobFunc = () => {
    console.log(position, description);
    dispatch(
      addJob({
        position,
        description,
        department,
        location,
        assignedTo,
        salaryMax,
        salaryMin,
        deadlineDate,
      })
    );
  };

  useEffect(() => {
    if(state.addJob.success) {
        navigate('/jobs/all')
        dispatch(actions.setAddJobSuccessFalse())
    }
  }, [state.addJob.success])

  return (
    <>
      <div className={s.addingVacancy}>
        <div className={s.wrapper}>
          <h1 className={s.title}>{t("addVacancy.title")}</h1>
          <div className={s.twoInput}>
            <AddJobInput
              className={s.input}
              label={t("addVacancy.department")}
              onChange={(value) => setDepartment(value)}
              value={department}
            />
            <AddJobInput
              className={s.input}
              label={t("addVacancy.position")}
              onChange={(value) => setPosition(value)}
              value={position}
            />
          </div>
          <div className={s.twoInput}>
            <AddJobInput
              className={s.input}
              onChange={(value) => setLocation(value)}
              value={location}
              label={t("addVacancy.location")}
              widthInput={"809px"}
            />
          </div>
          <div className={s.twoInput}>
            <MyInput
              className={s.input}
              label={t("addVacancy.deadlineDate")}
              onChange={(value) => setDeadlineDate(value)}
              value={deadlineDate}
              type={"date"}
            />
            <AddJobInput
              className={s.input}
              label={t("addVacancy.assignedTo")}
              placeholder={t("addVacancy.findEmployee")}
              // onChange={(value) => setSurname(value)}
              // value={surname}
              disabled={'true'}
            />
          </div>
          <div className={s.twoInput}>
            <MyInput
              className={s.input}
              label={t("addVacancy.salaryMin")}
              onChange={(value) => setSalaryMin(value)}
              value={salaryMin}
              type={"number"}
            />
            <MyInput
              className={s.input}
              label={t("addVacancy.salaryMax")}
              onChange={(value) => setSalaryMax(value)}
              value={salaryMax}
              type={"number"}
            />
          </div>
          <div className={s.twoInput}>
            <Textarea
              label={t("addVacancy.description")}
              onChange={(value) => setDescription(value)}
              value={description}
              heightInput={'150px'}
            />
          </div>
          <MyButton
            className={s.button}
            title={
              state.addJob.loading ? (
                <Loader width={"30px"} height={"30px"} />
              ) : (
                t("addCandidate.create")
              )
            }
            justContent={"left"}
            onClick={addJobFunc}
            isLoading={state.addJob.loading}
          />
        </div>
      </div>
    </>
  );
};

export default AddingVacancy;
