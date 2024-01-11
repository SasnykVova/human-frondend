import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./employeeDetails.module.scss";
import {
  deleteUser,
  employeesSlice,
  getOneUser,
} from "../../../../toolkitRedux/reducer/employeesSlice";
import birthDateSplit from "../../../../assets/common/birthDateSplit";
import LoaderThreeLine from "../../../../UI-components/loaderThreeLine/LoaderThreeLine";
import MyButton from "../../../../UI-components/button/MyButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import SimpleModal from "../../../../UI-components/simpleModal/simpleModal";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import InfoBlock from "../../../profile/details/infoBlock/InfoBlock";
import { useTranslation } from "react-i18next";

const EmployeeDetails = () => {

  const { t } = useTranslation();

  const state = useSelector((state) => state.employeesPage);
  const { ...employeeData } = useSelector(
    (state) => state.employeesPage.employeeData
  );
  console.log(employeeData);
  const { ...actions } = employeesSlice.actions;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const empId = location.pathname.split('/')[2]
  

  const persInfoData = [
    { titleKey: t("empoyeeDetails.name"), value: employeeData.name },
    { titleKey: t("empoyeeDetails.surname"), value: employeeData.surname },
    { titleKey: t("empoyeeDetails.genderTitle"), value: employeeData.gender === 'male' ? t("empoyeeDetails.gender.MALE") : t("empoyeeDetails.gender.FEMALE") },
    {
      titleKey: t("empoyeeDetails.birthDate"),
      value: birthDateSplit(employeeData.birthDate),
    },
  ];
  const contactInfoData = [
    { titleKey: t("empoyeeDetails.email"), value: employeeData.email },
    {
      titleKey: t("empoyeeDetails.mobile"),
      value: employeeData.mobileNumber,
    },
    { titleKey: t("empoyeeDetails.address"), value: employeeData.address },
  ];
  const workInfoData = [
    { titleKey: t("empoyeeDetails.department"), value: employeeData.department },
    { titleKey: t("empoyeeDetails.position"), value: employeeData.position },
    { titleKey: t("empoyeeDetails.startDate"), value: birthDateSplit(employeeData.startDate) },
  ];

  useEffect(() => {
    dispatch(getOneUser(empId));
  }, []);
  const deleteEmployee = (id) => {
    dispatch(deleteUser(id));
  };
  useEffect(() => {
    if (state.deleteNavigate) {
      navigate("/employees");
    }
    dispatch(actions.getDeleteNavigate(false));
  }, [state.deleteNavigate]);

  return (
    <>
      <div className={s.employeeDetails}>
          <SimpleModal
            isLoading={state.deleteUserLoading}
            isSuccess={state.deleteUserSuccess}
            onClickBtn={() => deleteEmployee(employeeData.id)}
            onClickBtn2={() => dispatch(actions.getDeleteUserSuccess(false))}
            width={"300px"}
            height={"200px"}
            titleButton={t("empoyeeDetails.yes")}
            titleButton2={t("empoyeeDetails.no")}
          >
            <div style={{ fontSize: "16px", textAlign: "center" }}>
            {t("empoyeeDetails.deletingDescription")} {employeeData.name}{" "}
              {employeeData.surname} ?
            </div>
          </SimpleModal>
        {state.getOne.loading ? (
          <div className={s.loaderWrapper}>
            <LoaderThreeLine />
          </div>
        ) : (
          <div className={s.wrapper}>
            <div className={s.header}>
              <h3 className={s.headerTitle}>{t(`empoyeeDetails.title`)} #{employeeData.id}</h3>
              <MyButton
                onClick={() => dispatch(actions.getDeleteUserSuccess(true))}
                title={t(`empoyeeDetails.deleteEmployee`)}
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
              <h3 className={s.mainTitle}>{t(`empoyeeDetails.personalInfo`)}</h3>
              <InfoBlock data={persInfoData} />
              <h3 className={s.mainTitle}>{t(`empoyeeDetails.contactInfo`)}</h3>
              <InfoBlock data={contactInfoData} />
              <h3 className={s.mainTitle}>{t(`empoyeeDetails.workInfo`)}</h3>
              <InfoBlock data={workInfoData} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EmployeeDetails;
