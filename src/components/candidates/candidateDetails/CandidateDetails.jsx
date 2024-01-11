import React, { useEffect } from "react";
import s from "./CandidateDetails.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  candidatesSlice,
  deleteCandidate,
  getOneCandidate,
} from "../../../toolkitRedux/reducer/candidatesSlice";
import InfoBlock from "../../profile/details/infoBlock/InfoBlock";
import birthDateSplit from "../../../assets/common/birthDateSplit";
import { useLocation, useNavigate } from "react-router";
import LoaderThreeLine from "../../../UI-components/loaderThreeLine/LoaderThreeLine";
import MyButton from "../../../UI-components/button/MyButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import ModalWindow from "../../../UI-components/modalWindow/ModalWindow";
import SimpleModal from "../../../UI-components/simpleModal/simpleModal";
import { useTranslation } from "react-i18next";

const CandidateDetails = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const actions = candidatesSlice.actions;
  const state = useSelector((state) => state.candidatesPage);
  const location = useLocation();
  const navigate = useNavigate();

  const empId = location.pathname.split('/')[2]

  const persInfoData = [
    { titleKey: t("candidates.candidateDetails.name"), value: state.getOne.candidateData.name },
    { titleKey: t("candidates.candidateDetails.surname"), value: state.getOne.candidateData.surname },
    { titleKey: t("candidates.candidateDetails.genderTitle"), value: state.getOne.candidateData.gender === "Male" 
    ? t("candidates.candidateDetails.gender.MALE") : t("candidates.candidateDetails.gender.FEMALE")},
    {
      titleKey: t("candidates.candidateDetails.birthDate"),
      value: birthDateSplit(state.getOne.candidateData.birthDate),
    },
  ];
  const contactInfoData = [
    { titleKey: t("candidates.candidateDetails.email"), value: state.getOne.candidateData.email },
    {
      titleKey: t("candidates.candidateDetails.mobile"),
      value: state.getOne.candidateData.mobileNumber,
    },
    { titleKey: t("candidates.candidateDetails.location"), value: state.getOne.candidateData.location },
  ];
  const workInfoData = [
    { titleKey: t("candidates.candidateDetails.position"), value: state.getOne.candidateData.position },
    { titleKey: t("candidates.candidateDetails.salary"), value: `${state.getOne.candidateData.salary}₴` },
  ];
  useEffect(() => {
    dispatch(getOneCandidate(empId));
  }, []);

  const handleDeleteCandidate = (empId) => {
    dispatch(deleteCandidate(empId));
  };
  useEffect(() => {
    if (state.deleteCandidate.success) {
      navigate("/candidates");
    }
  }, [state.deleteCandidate.success]);

  return (
    <>
      <div className={s.candidateDetails}>
        {state.deleteCandidate.modalOpen ? (
          <SimpleModal
            isLoading={state.deleteCandidate.loading}
            isSuccess={state.deleteCandidate.modalOpen}
            onClickBtn={() => handleDeleteCandidate(empId)}
            onClickBtn2={() => dispatch(actions.setDeleteCanModalOpen(false))}
            width={"300px"}
            height={"200px"}
            titleButton={t("candidates.candidateDetails.yes")}
            titleButton2={t("candidates.candidateDetails.no")}
          >
            <div style={{ fontSize: "16px", textAlign: "center" }}>
              {t("candidates.candidateDetails.deletingDescription")}{" "}
              {state.getOne.candidateData.name}{" "}
              {state.getOne.candidateData.surname} ?
            </div>
          </SimpleModal>
        ) : (
          ""
        )}
        {state.getOne.loading ? (
          <div className={s.loaderWrapper}>
            <LoaderThreeLine />
          </div>
        ) : (
          <div className={s.wrapper}>
            <div className={s.header}>
              <h3 className={s.headerTitle}>
                {t("candidates.candidateDetails.title")} #{state.getOne.candidateData.id}
              </h3>
              <MyButton
                onClick={() => dispatch(actions.setDeleteCanModalOpen(true))}
                title={t("candidates.candidateDetails.deleteCandidate")}
                displayMyButton={"block"}
                padMyButton={"20px 50px 0px 0px"}
                gap={"10px"}
                icon={<RiDeleteBin6Line />}
                col={"red"}
                bg={"white"}
                bor={"1px solid red"}
              />
            </div>
            <div className={s.main}>
              <h3 className={s.mainTitle}>{t("candidates.candidateDetails.personalInfo")}</h3>
              <InfoBlock data={persInfoData} />
              <h3 className={s.mainTitle}>{t("candidates.candidateDetails.contactInfo")}</h3>
              <InfoBlock data={contactInfoData} />
              <h3 className={s.mainTitle}>{t("candidates.candidateDetails.workInfo")}</h3>
              <InfoBlock data={workInfoData} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CandidateDetails;
