import React, { useMemo, useState } from 'react';
import s from './Jobs.module.scss';
// import Vacancy from './vacancy/Vacancy';
// import { ReactComponent as Add } from '../../assets/icon/jobs/vacancy/add.svg';
// import { ReactComponent as Close } from '../../assets/icon/jobs/vacancy/close.svg';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import './jobs.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addJob, getJobs, jobsSlice } from '../../toolkitRedux/reducer/jobsSlice';
import AllJobs from './activeJobs/AllJobs';
import AddJobInput from './activeJobs/addJobInput/AddJobInput';
import Modal from '../../UI-components/modal/modal';
import Loader from '../../UI-components/loader/Loader';
import MyInput from '../../UI-components/input/MyInput';
import ActiveJobs from './activeJobs/active/ActiveJobs';
import InactiveJobs from './activeJobs/inactive/InactiveJobs';
import HeaderBlock from '../../UI-components/headerBlock/HeaderBlock';
import { MdDone } from 'react-icons/md';
import { Pagination, Stack, debounce } from '@mui/material';
import { useTranslation } from 'react-i18next';


const Jobs = (props) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const state = useSelector(state => state.jobsPage)
    const navigate = useNavigate();
    // const stateAuth = useSelector(state => state.auth)
    const actions = jobsSlice.actions

    const [position, setPosition] = useState('');
    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState('');
    const [location, setLocation] = useState('');
    const assignedTo = {
        surname: localStorage.getItem('surname'),
        name: localStorage.getItem('name'),
        id: localStorage.getItem('id'),
    };
    const [salaryMax, setSalaryMax] = useState('');
    const [salaryMin, setSalaryMin] = useState('');
    const [deadlineDate, setDeadlineDate] = useState('');

    const [ isChecked, setIsChecked ] = useState(false);

    const limit = state.limit;
    const page = state.page;
    const onlyMine = state.getJobs.onlyMine;
    const status = state.getJobs.status;

    const [ filter, setFilter ] = useState('');

    const makeRequest = useMemo(
        () =>
        debounce((filter) => {
            dispatch(getJobs({status, limit, page, filter, onlyMine}))
        }, 500),
        [dispatch, status, limit, page, onlyMine]
    );
  
    const handleChange = (event) => {
        const newSearchTerm = event.target.value;
        setFilter(newSearchTerm);
        makeRequest(newSearchTerm)
      };


    const setStrValue = (isChecked) => {
        return dispatch(actions.setOnlyMine(isChecked ? '1' : ''))
    }
    const handleClick = (value) => {
        setIsChecked(value)
        setStrValue(value)
    }


    const addJobFunc = () => {
        console.log(position, description)
        dispatch(addJob({ position, description, department, location, assignedTo, salaryMax, salaryMin, deadlineDate }))
    }

    return (
        <div className={s.jobs}>
            <div className={s.jobs__wrapper}>
                <HeaderBlock
                    title={t("vacancies.title")}
                    titleBtn={t("vacancies.addNewVacancy")} 
                    onClickMyButton={() => navigate('/jobs/adding')}
                    labelCheckBox={t("vacancies.onlyMine")}
                    isChecked={isChecked}
                    onClickCheckBox={(value) => handleClick(value)}
                    labelSearchInput={t("vacancies.search")}
                    valueSearchInput={filter}
                    onChangeSearchInput={handleChange}
                    placeholder={t("vacancies.searchPlaceholder")}
                />
                {state.createNewVacancy ?
                    <Modal
                        onClickBtn={addJobFunc}
                        onClick={() => dispatch(actions.setCreateNewVacancy(false))}
                        title={t("vacancies.addNewVacancy")}
                        fontSize={'20px'}
                        titleButton={state.addJob.loading ? <Loader width={'30px'} height={'30px'} /> : t("vacancies.addNewVacancy")}
                        textError={state.error ? <div style={{ color: 'red', fontSize: '18px' }}>{state.error}</div> : ''}>
                        <div className={s.modalBlock}>
                            <AddJobInput
                                className={s.input}
                                onChange={(value) => setPosition(value)}
                                value={position}
                                label={'position'}
                            />
                            <AddJobInput
                                className={s.input} onChange={(value) => setDepartment(value)}
                                value={department}
                                label={'department'}
                            />
                            {/* <AddJobInput className={s.input} onChange={(value) => setAssignedTo(value)} value={assignedTo} label={'assignedTo'} /> */}
                            <AddJobInput
                                className={s.input}
                                onChange={(value) => setSalaryMin(value)}
                                value={salaryMin}
                                label={'salaryMin'}
                            />
                            <MyInput
                                className={s.input}
                                onChange={(value) => setDeadlineDate(value)}
                                value={deadlineDate}
                                type={'date'}
                                label={'deadlineDate'}
                            />
                        </div>
                        <div className={s.modalBlock}>
                            <AddJobInput className={s.input} onChange={(value) => setDescription(value)} value={description} label={'description'} />
                            <AddJobInput className={s.input} onChange={(value) => setLocation(value)} value={location} label={'location'} />
                            <AddJobInput className={s.input} onChange={(value) => setSalaryMax(value)} value={salaryMax} label={'salaryMax'} />
                        </div>
                    </Modal>
                    : ''}
                {state.addJob.success ?
                    <Modal className={s.addUserSucModal}
                        onClickBtn={() => dispatch(actions.setAddJobSuccessFalse())}
                        display={'none'} paddingModal={'15px'}
                        width={'400px'} height={'250px'}
                        titleButton={'OK'} displeyChild={'column'}
                        justifyContentChild={'center'} alignItemsChild={'center'}
                        textAlignChild={'center'} fzChild={'18px'}
                        gapChild={'30px'}>
                        <div className={s.addUserSucModalText}>The vacancy has been added successfully.</div>
                        <MdDone size={50} color='#38CB89' />
                    </Modal>
                    :
                    ''}
                <div id='statusBlock-menu' className="statusBlock">
                    <NavLink className={"activeJobs"} to={"/jobs/all"}>{t("vacancies.tabs.ALL")}</NavLink>
                    <NavLink className={"completed"} to={"/jobs/active"}>{t("vacancies.tabs.ACTIVE")}</NavLink>
                    <NavLink className={"unfinisheds"} to={"/jobs/inactive"}>{t("vacancies.tabs.INACTIVE")}</NavLink>
                </div>
                <div className={s.jobs__line}></div>
                <Routes className={s.routeWrapper}>
                    <Route path={"all"} element={<AllJobs />} />
                    <Route path={"active"} element={<ActiveJobs />} />
                    <Route path={"inactive"} element={<InactiveJobs />} />
                </Routes>
                <div className={s.paginator}>
                    {state.getJobs.loading ?
                        ''
                        :
                        state.count === null
                            ?
                            ''
                            :
                            <Stack>
                                <Pagination
                                    onChange={(event, value) => dispatch(actions.setCurrentPage(value))}
                                    page={state.page}
                                    count={state.count}
                                    shape="rounded"
                                    variant="outlined"
                                    showFirstButton
                                    showLastButton
                                />
                            </Stack>
                    }
                </div>
            </div>
        </div>
    );
}

export default Jobs;
