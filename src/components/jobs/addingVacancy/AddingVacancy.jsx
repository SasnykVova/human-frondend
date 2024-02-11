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
import { useForm } from "react-hook-form";

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
    reset();
  };

  return (
    <>
      <div className={s.addingVacancy}>
        <form className={s.wrapper} onSubmit={handleSubmit(submit)}>
          <h1 className={s.title}>{t("addVacancy.title")}</h1>
          <div className={s.twoInput}>
            <AddJobInput
              className={s.input}
              label={t("addVacancy.department")}
              name={'department'}
              register={register}
              errors={errors}
            />
            <AddJobInput
              className={s.input}
              label={t("addVacancy.position")}
              name={'position'}
              register={register}
              errors={errors}
            />
          </div>
          <div className={s.twoInput}>
            <AddJobInput
              className={s.input}
              label={t("addVacancy.location")}
              name={'location'}
              register={register}
              errors={errors}
              widthInput={'809px'}
            />
          </div>
          <div className={s.twoInput}>
            <MyInput
              className={s.input}
              label={t("addVacancy.deadlineDate")}
              name={'deadlineDate'}
              register={register}
              errors={errors}
              type={"date"}
            />
            <AddJobInput
              className={s.input}
              label={t("addVacancy.assignedTo")}
              placeholder={t("addVacancy.findEmployee")}
              name={'assignedTo'}
              register={register}
              errors={errors}
              // disabled={'true'}
            />
          </div>
          <div className={s.twoInput}>
            <MyInput
              className={s.input}
              label={t("addVacancy.salaryMin")}
              name={'salaryMin'}
              register={register}
              errors={errors}
              type={"number"}
            />
            <MyInput
              className={s.input}
              label={t("addVacancy.salaryMax")}
              name={'salaryMax'}
              register={register}
              errors={errors}
              type={"number"}
            />
          </div>
          <div className={s.twoInput}>
            <Textarea
              label={t("addVacancy.description")}
              name={'description'}
              register={register}
              errors={errors}
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
            isLoading={state.addJob.loading}
            disabled={!isValid && "true"}
          />
        </form>
      </div>
    </>
  );
};

export default AddingVacancy;
