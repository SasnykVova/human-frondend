import React, { useEffect, useMemo, useState } from 'react';
import s from './Employees.module.scss';
import MyButton from '../../UI-components/button/MyButton';
import { AiOutlinePlus } from "react-icons/ai";
import Modal from '../../UI-components/modal/modal';
import AddJobInput from '../jobs/activeJobs/addJobInput/AddJobInput';
import Criterion from './criterion/Сriterion';
import Employee from './employee/employee';
import { Pagination, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, employeesSlice, getUsers } from '../../toolkitRedux/reducer/employeesSlice';
import LoaderThreeLine from '../../UI-components/loaderThreeLine/LoaderThreeLine';
import MyInput from '../../UI-components/input/MyInput';
import MyRadioInput from '../../UI-components/input/radioInput/MyRadioInput';
import { MdDone } from "react-icons/md";
import Loader from '../../UI-components/loader/Loader';
import SimpleModal from '../../UI-components/simpleModal/simpleModal';
import birthDateSplit from '../../assets/common/birthDateSplit';
import { NavLink } from 'react-router-dom';
import HeaderBlock from './../../UI-components/headerBlock/HeaderBlock';
import debounce from '../../assets/common/debounce';
import { useTranslation } from 'react-i18next';




const Employees = () => {

    const { t } = useTranslation();

    const state = useSelector(state => state.employeesPage);
    const dispatch = useDispatch();
    const { ...actions } = employeesSlice.actions

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [surname, setSurname] = useState();
    const [mobileNumber, setMobileNumber] = useState();
    const [birthDate, setBirthDate] = useState();
    const [address, setAddress] = useState();
    const [startDate, setStartDate] = useState();
    const [department, setDepartment] = useState();
    const [position, setPosition] = useState();
    const [role, setRole] = useState();
    const [gender, setGender] = useState('male');

    const [filter, setFilter] = useState('')

    const makeRequest = useMemo(
        () => 
        debounce((filter) => {
            dispatch(getUsers(state.limit, state.currentPage, filter))
        }, 500),
        []
    );

    const handleChange = (event) => {
        const newSearchTerm = event.target.value;
        setFilter(newSearchTerm);
        makeRequest(newSearchTerm)
      };

    const [delEmpModal, setDelEmpModal] = useState({
        id: '',
        name: '',
        surname: '',
    })
    const delEmpId = delEmpModal.id

    useEffect(() => {
        dispatch(getUsers(state.limit, state.currentPage))
        setName('')
        setPosition('')
        setBirthDate('')
        setDepartment('')
        setSurname('')
        setMobileNumber('')
        setAddress('')
        setRole('')
        setEmail('')
        setStartDate('')
        setGender('')
    }, [state.currentPage, dispatch, state.limit, state.isSuccess, state.deleteUserSuccess])

    const addOneUser = () => {
        dispatch(addUser({ name, position, birthDate, department, surname, mobileNumber, address, email, role, startDate, gender }))
    }
    const deleteEmployee = (id) => {
        dispatch(deleteUser(id))
    }
    return (
        <div className={s.employeesPage}>
            {state.isSuccess ?
                <Modal className={s.addUserSucModal} 
                    onClickBtn={() => dispatch(actions.getIsSuccessFalse())} 
                    display={'none'} paddingModal={'15px'}
                    width={'400px'} height={'250px'} 
                    titleButton={'OK'} displeyChild={'column'} 
                    justifyContentChild={'center'} alignItemsChild={'center'}
                    textAlignChild={'center'} fzChild={'18px'} 
                    gapChild={'30px'}>
                    <div className={s.addUserSucModalText}>The employee has been added successfully.</div>
                    <MdDone size={50} color='#38CB89' />
                </Modal>
                :
                ''}
            {state.createNewEmployee
                ?
                <Modal onClickBtn={addOneUser} onClick={() => dispatch(actions.getCreateNewEmployee(false))} title={'Add new employee'} fontSize={'20px'}
                    titleButton={state.isLoading ? <Loader width={'30px'} height={'30px'} /> : 'Add Employee'}
                    textError={state.error ? <div style={{ color: 'red', fontSize: '18px' }}>{state.error}</div> : ''}>
                    <div className={s.modalBlock}>
                        <AddJobInput className={s.input} onChange={(value) => setName(value)} value={name} label={'name'} />
                        <AddJobInput className={s.input} onChange={(value) => setEmail(value)} value={email} label={'email'} />
                        <AddJobInput className={s.input} onChange={(value) => setPosition(value)} value={position} label={'position'} />
                        <MyInput className={s.input} onChange={(value) => setBirthDate(value)} value={birthDate} type={'date'} label={'birthDate'} />
                        <MyRadioInput className={s.input} onChange={(value) => setGender(value)} checked={gender}
                            name={'gender'} title='Gender' type={'radio'} label1={'male'} label2={'female'} label3={'another'} />
                        <AddJobInput className={s.input} onChange={(value) => setDepartment(value)} value={department} label={'department'} />
                    </div>
                    <div className={s.modalBlock}>
                        <AddJobInput className={s.input} onChange={(value) => setSurname(value)} value={surname} label={'surname'} />
                        <MyInput className={s.input} onChange={(value) => setMobileNumber(value)} value={mobileNumber} type={'number'} label={'mobileNumber'} />
                        <AddJobInput className={s.input} onChange={(value) => setAddress(value)} value={address} label={'address'} />
                        <MyInput className={s.input} onChange={(value) => setStartDate(value)} value={startDate} type={'date'} label={'startDate'} />
                        <AddJobInput className={s.input} onChange={(value) => setRole(value)} value={role} label={'role'} />
                    </div>
                </Modal>
                :
                ''}
            <div className={s.wrapper}>
                <HeaderBlock
                    title={t(`employees.title`)}
                    titleBtn={t(`employees.addEmployee`)}
                    searchInputDisplay={'none'}
                    labelSearchInput={t(`employees.search`)}
                    onClickMyButton={() => dispatch(actions.getCreateNewEmployee(true))}
                    onChangeSearchInput={handleChange}
                    valueSearchInput={filter}
                    placeholder={t(`employees.searchPlaceholder`)}
                />
                {/* <div className={s.titleBlockWrapper}>
                    <div className={s.titleBlock}>
                        <div className={s.title}>Employees</div>
                        <div className={s.totalNumber}>
                            <div className={s.totalTitle}>Employees list</div>
                            <div className={s.totalNumber}></div>
                        </div>
                    </div>
                    <div className={s.btnWrapper}>
                        <MyButton 
                        onClick={() => dispatch(actions.getCreateNewEmployee(true))} 
                        className={s.addEmpBtn} 
                        icon={<AiOutlinePlus size={25} />} 
                        gap={'10px'} 
                        title={'Add New Employee'} />
                    </div>
                </div> */}
                <div className={s.employeesBlock}>
                    <div className={s.criteriaBlock}>
                        <Criterion width={'19%'} icon={''} title={t(`employees.employee`)} />
                        <Criterion width={'19%'} icon={''} title={t(`employees.position`)} />
                        <Criterion width={'19%'} icon={''} title={t(`employees.location`)} />
                        <Criterion width={'19%'} icon={''} title={t(`employees.mobileNumber`)} />
                        <Criterion width={'19%'} icon={''} title={t(`employees.birthdate`)} />
                        <Criterion width={'5%'} icon={''} title={''} />
                    </div>
                    <div className={s.employees}>
                        <SimpleModal 
                            isLoading={state.deleteUserLoading} 
                            isSuccess={state.deleteUserSuccess} 
                            onClickBtn={() => deleteEmployee(delEmpId)} 
                            onClickBtn2={() => dispatch(actions.getDeleteUserSuccess(false))} 
                            width={'300px'} height={'200px'} titleButton={t(`employees.yes`)} titleButton2={t(`employees.no`)}
                        >
                            <div style={{ fontSize: '16px', textAlign: 'center' }}>
                            {t(`employees.deletingDescription`)} {delEmpModal.name} {delEmpModal.surname} ?</div>
                        </SimpleModal>
                        {state.isLoading ?
                            <LoaderThreeLine />
                            :
                            state.employeesData.map(emp =>
                                 <NavLink onClick={() => dispatch(actions.getOneUserId(emp.id))} to={`/employees/${emp.id}`}><Employee key={emp._id} name={emp.name} surName={emp.surname} rating={emp.rating} stage={emp.stage}
                                position={emp.position} salary={emp.salary} location={emp.address} birthData={birthDateSplit(emp.birthDate)} mobileNumber={emp.mobileNumber}
                                onClickDelete={(e) => {
                                    dispatch(actions.getDeleteUserSuccess(true))
                                    setDelEmpModal({ id: emp.id, name: emp.name, surname: emp.surname })
                                    e.preventDefault()
                                }} />
                                    </NavLink>)}
                    </div>
                </div>
                <div className={s.paginationWrapper}>
                    {state.isLoading 
                        ?
                        ''
                        :
                        state.totalPage === 0 
                        ?
                        ''
                        :
                        <Stack>
                            <Pagination 
                                onChange={(event, value) => dispatch(actions.setCurrentPage(value))} 
                                page={state.currentPage} 
                                count={state.totalPage} 
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

export default Employees;
