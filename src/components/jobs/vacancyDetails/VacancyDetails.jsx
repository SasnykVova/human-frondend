import React, { useEffect, useMemo, useState } from "react";
import s from "./VacancyDetails.module.scss";
import MyButton from "../../../UI-components/button/MyButton";
import { AiOutlinePlus } from "react-icons/ai";
import MainHeader from "../../../UI-components/mainHeader/MainHeader";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deactivateJob,
  getJob,
  jobsSlice,
} from "../../../toolkitRedux/reducer/jobsSlice";
import LoaderThreeLine from "../../../UI-components/loaderThreeLine/LoaderThreeLine";
import Details from "./details/Details";
import Timeline from "./timeline/Timeline";
import Candidates from "./candidates/Candidates";
import ModalWindow from "../../../UI-components/modalWindow/ModalWindow";
import SearchInput from "../../../UI-components/input/search/SearchInput";
import SearchPanel from "../../../UI-components/searchPanel/SearchPanel";
import debounce from "./../../../assets/common/debounce";
import {
  candidatesSlice,
  getSearchCandidate,
} from "../../../toolkitRedux/reducer/candidatesSlice";
import SimpleModal from "../../../UI-components/simpleModal/simpleModal";
import Modal from "../../../UI-components/modal/modal";
import { MdDone } from "react-icons/md";
import { useTranslation } from "react-i18next";

const VacancyDetails = (props) => {

  const { t } = useTranslation();

  const state = useSelector((state) => state.jobsPage);
  const stateCandidates = useSelector((state) => state.candidatesPage);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const actions = jobsSlice.actions;
  const actionsCandidates = candidatesSlice.actions;
  console.log(stateCandidates.getSearchCandidate.loading);

  const vacancyId = location.pathname.split("/")[3];
  

  const data = [
    {
      className: "navlink",
      to: `/jobs/all/${vacancyId}/candidates`,
      title: t("vacancies.vacancyDetails.tabs.candidates"),
    },
    {
      className: "navlink",
      to: `/jobs/all/${vacancyId}/vacancyDetails`,
      title: t("vacancies.vacancyDetails.tabs.vacancyDetails"),
    },
    {
      className: "navlink",
      to: `/jobs/all/${vacancyId}/timeline`,
      title: t("vacancies.vacancyDetails.tabs.timeline"),
    },
  ];

  const [searchValue, setSearchValue] = useState("");

  const userIdDetails = state.userIdDetails;
  const jobDetails = state.jobDetails;
  console.log(searchValue);

  const candidateName = stateCandidates.getSearchCandidate.candidateName;

  const makeRequest = useMemo(
    () =>
      debounce((candidateName) => {
        dispatch(getSearchCandidate(candidateName));
      }, 500),
    []
  );

  const modalClosed = () => {
    dispatch(actions.setAddTaskModal(false));
    dispatch(actionsCandidates.deleteUserNameData());
    dispatch(actionsCandidates.setSeachCandidateName(""));
  };

  const handleChange = (event) => {
    const newSearchTerm = event.target.value;
    dispatch(actionsCandidates.setSeachCandidateName(newSearchTerm));
    makeRequest(newSearchTerm);
  };
  const handleSetSearch = (name, surname) => {
    const value = "";
    setSearchValue(value, name, surname);
  };

  const candidate = state.addTask.candidate;
  const boardId = state.getJob.desk.id;
  const id = vacancyId;

  const handleAddTask = () => {
    dispatch(addTask({ id, boardId, candidate }));
  };

  useEffect(() => {
    dispatch(getJob(vacancyId));
    dispatch(actions.setAddTaskSuccessFalse())
    dispatch(actions.setDeleteTaskSuccFalse())
  }, [dispatch, state.addTask.success,state.deleteTask.success]);

  useEffect(() => {
    if (state.addTask.success) {
      dispatch(actions.setAddTaskModal(false));
    }
  }, [state.addTask.success]);

  useEffect(() => {
    return () => {
      dispatch(actions.setAddTaskModal(false));
    };
  }, [dispatch]);

  useEffect(() => {
    if(state.deactivateJob.success) {
        dispatch(actions.setModalIsOpen(false))
        dispatch(actions.setModalDeactivateSuccess(true))
    }
  }, [state.deactivateJob.success])

  const handleClickDone = () => {
    dispatch(actions.setModalDeactivateSuccess(false))
    dispatch(actions.setDeactivateSuccFalse())
    navigate('/jobs/all')
  }
  
  const handleDeactivateJob = (vacancyId) => {
    let id = vacancyId
    dispatch(deactivateJob(id))
  }

  console.log(state.deactivateJob.modalIsOpen)

  return (
    <>
      <div className={s.vacancyDetails}>
        {state.getJob.loading ? (
          <LoaderThreeLine />
        ) : (
          <div className={s.wrapper}>
            {state.deactivateJob.modalDeactivateSuccess ?
                <Modal className={s.addUserSucModal} 
                    onClickBtn={handleClickDone} 
                    display={'none'} paddingModal={'15px'}
                    width={'400px'} height={'250px'} 
                    titleButton={'OK'} displeyChild={'column'} 
                    justifyContentChild={'center'} alignItemsChild={'center'}
                    textAlignChild={'center'} fzChild={'18px'} 
                    gapChild={'30px'}>
                    <div className={s.addUserSucModalText}>{t(`vacancies.vacancyDetails.deaSuccessDescription`)}.</div>
                    <MdDone size={50} color='#38CB89' />
                </Modal>
                :
                ''
            }
                <SimpleModal
                    isLoading={state.deactivateJob.loading}
                    isSuccess={state.deactivateJob.modalIsOpen}
                    onClickBtn={() => handleDeactivateJob(vacancyId)}
                    onClickBtn2={() => dispatch(actions.setModalIsOpen(false))}
                    width={"300px"}
                    height={"200px"}
                    titleButton={t(`vacancies.vacancyDetails.yes`)}
                    titleButton2={t(`vacancies.vacancyDetails.no`)}
                    >
                    <div style={{ fontSize: "16px", textAlign: "center" }}>
                      {t(`vacancies.vacancyDetails.deactivationDescription`)}
                    </div>
                </SimpleModal>
            {state.addTaskModal ? (
              <ModalWindow
                className={s.modalWindow}
                closedModal={modalClosed}
                title={t(`vacancies.vacancyDetails.addTask`)}
                headerTitle={t(`vacancies.vacancyDetails.addtaskTitle`)}
                onClick={handleAddTask}
              >
                <div className={s.text}>
                  {t(`vacancies.vacancyDetails.addtaskDescription`)}
                </div>
                <SearchInput
                  placeholder={t(`vacancies.searchPlaceholder`)}
                  onChange={handleChange}
                  value={stateCandidates.getSearchCandidate.candidateName}
                  label={t(`vacancies.vacancyDetails.findCandidate`)}
                  border={"1px solid rgba(128, 128, 128, 0.300)"}
                  width={"100%"}
                />
                {stateCandidates.userNameData.length ? (
                  <SearchPanel data={stateCandidates.userNameData} />
                ) : (
                  ""
                )}
                <div className={s.textSecond}>
                  {t(`vacancies.vacancyDetails.cantFindCandidate`)}
                </div>
                <MyButton
                  title={t(`vacancies.vacancyDetails.addCandidate`)}
                  width={"100%"}
                  onClick={() => navigate("/candidates/adding")}
                />
              </ModalWindow>
            ) : (
              ""
            )}
            <div className={s.titleBlock}>
              <h1 className={s.title}>{t(`vacancies.vacancyDetails.title`)} #{jobDetails.id}</h1>
              <MyButton
                className={s.myButton}
                onClick={() => dispatch(actions.setModalIsOpen(true))}
                title={t(`vacancies.vacancyDetails.deactivate`)}
                displayMyButton={"block"}
                col={"red"}
                bg={"white"}
                bor={"1px solid red"}
              />
            </div>
            <div className={s.subTitle}>{jobDetails.department}</div>
            <div className={s.myButton}>
              <MyButton
                onClick={() => dispatch(actions.setAddTaskModal(true))}
                icon={<AiOutlinePlus size={25} />}
                title={t(`vacancies.vacancyDetails.addTask`)}
                gap={"10px"}
              />
            </div>
            <MainHeader data={data} />
            <div>
              <Routes>
                <Route path="candidates" element={<Candidates />} />
                <Route path="vacancyDetails" element={<Details />} />
                <Route path="timeline" element={<Timeline />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VacancyDetails;
