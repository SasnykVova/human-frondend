import React, { useEffect, useMemo, useState } from "react";
import s from "./Candidates.module.scss";
import HeaderBlock from "../../UI-components/headerBlock/HeaderBlock";
import { useDispatch, useSelector } from "react-redux";
import {
  candidatesSlice,
  deleteCandidate,
  getCandidates,
} from "../../toolkitRedux/reducer/candidatesSlice";
import Criterion from "../employees/criterion/Сriterion";
import { NavLink, useNavigate } from "react-router-dom";
import Candidate from "./candidate/Candidate";
import birthDateSplit from "./../../assets/common/birthDateSplit";
import { Pagination, Stack } from "@mui/material";
import LoaderThreeLine from "../../UI-components/loaderThreeLine/LoaderThreeLine";
import SimpleModal from "../../UI-components/simpleModal/simpleModal";
import debounce from "../../assets/common/debounce";
import { useTranslation } from "react-i18next";

const Candidates = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const actions = candidatesSlice.actions;
  const state = useSelector((state) => state.candidatesPage);
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  


  const criteriaData = [
    { id: 1, title: t("candidates.candidate"), },
    { id: 2, title: t("candidates.location"), },
    { id: 3, title: t("candidates.position"), },
    { id: 4, title: t("candidates.mobileNumber"), },
    { id: 5, title: t("candidates.birthdate"), },
    { id: 6, title: "", width: "50px" },
  ];

  const [deleteCandidateInfo, setDeleteCandidateInfo] = useState({
    id: "",
    name: "",
    surname: "",
  });

  const setFilter = (isChecked) => {
    return dispatch(actions.setOnlyMine(isChecked ? "1" : ""));
  };
  const handleClick = (value) => {
    setIsChecked(value);
    setFilter(value);
  };

  const limit = state.getCandidates.limit;
  const page = state.getCandidates.page;
  const filter = state.getCandidates.filter;
  const onlyMine = state.getCandidates.onlyMine;

  useEffect(() => {
    dispatch(getCandidates({ limit, page, filter, onlyMine }));
  }, [state.deleteCandidate.success, onlyMine]);

  const makeRequest = useMemo(
      () =>
      debounce((searchValue) => {
          dispatch(getCandidates({limit, page, filter: searchValue, onlyMine}))
      }, 500),
      []
  );

  const handleChange = (event) => {
      const newSearchTerm = event.target.value;
      setSearchValue(newSearchTerm);
      makeRequest(newSearchTerm)
    };

  return (
    <>
      <div className={s.candidates}>
        <SimpleModal
          isLoading={state.deleteCandidate.loading}
          isSuccess={state.deleteCandidate.modalOpen}
          onClickBtn={() => dispatch(deleteCandidate(deleteCandidateInfo.id))}
          onClickBtn2={() => dispatch(actions.setDeleteCanModalOpen(false))}
          width={"300px"}
          height={"200px"}
          titleButton={t("candidates.candidateDetails.yes")}
          titleButton2={t("candidates.candidateDetails.no")}
        >
          <div style={{ fontSize: "16px", textAlign: "center" }}>
          {t("candidates.candidateDetails.deletingDescription")} {deleteCandidateInfo.name}
            {deleteCandidateInfo.surname} ?
          </div>
        </SimpleModal>
        <div className={s.wrapper}>
          <HeaderBlock
            className={s.headerBlock}
            title={t("candidates.title")}
            titleBtn={t("candidates.addCandidate")}
            labelSearchInput={t("candidates.search")}
            labelCheckBox={t("candidates.onlyMine")}
            onClickMyButton={() => navigate("/candidates/adding")}
            isChecked={isChecked}
            onClickCheckBox={(value) => handleClick(value)}
            onChangeSearchInput={handleChange}
            valueSearchInput={searchValue}
            placeholder={t("candidates.searchPlaceholder")}
          />
          <div 
            className={s.candidatesBlock} 
            style={{maxWidth: (state.navBar.isOpen && window.innerWidth > 767) ? 'calc(100vw - 266px)' : window.innerWidth < 320 ? 'calc(100vw - 28px' : 'calc(100vw - 64px)'}}>  
            <div className={s.criteriaBlock}>
              {criteriaData.map((c) => (
                <Criterion key={c.id} width={c.width} title={c.title} />
              ))}
            </div>
            {state.getCandidates.loading ? (
                <LoaderThreeLine />
              ) :
            <div className={s.candidates}>
                {state.getCandidates.candidatesData.map((c) => (
                  <NavLink
                    onClick={() => dispatch(actions.setCandidateId(c.id))}
                    to={`/candidates/${c.id}`}
                  >
                    <Candidate
                      className={s.candidatesBlock}
                      key={c.id}
                      name={c.name}
                      surname={c.surname}
                      location={c.location}
                      position={c.position}
                      birthDate={birthDateSplit(c.birthDate)}
                      mobileNumber={c.mobileNumber}
                      onClickDelete={(e) => {
                        e.preventDefault();
                        dispatch(actions.setDeleteCanModalOpen(true));
                        setDeleteCandidateInfo({
                          id: c.id,
                          name: c.name,
                          surname: c.surname,
                        });
                      }}
                    />
                  </NavLink>
                ))}
            </div>}
          </div>
          <div className={s.paginationWrapper}>
            {state.getCandidates.loading ? (
              ""
            ) : state.getCandidates.totalPages <= 1 ? (
              ""
            ) : (
              <Stack>
                <Pagination
                  onChange={(event, value) =>
                    dispatch(actions.setCurrentPage(value))
                  }
                  page={page}
                  count={limit}
                  shape="rounded"
                  variant="outlined"
                  showFirstButton
                  showLastButton
                />
              </Stack>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Candidates;
