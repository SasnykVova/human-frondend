import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './employeeDetails.module.scss';
import TitleInfoBlock from './titleInfoBlock/titleInfoBlock';
import { deleteUser, employeesSlice, getOneUser } from '../../../../toolkitRedux/reducer/employeesSlice';
import birthDateSplit from '../../../../assets/common/birthDateSplit';
import LoaderThreeLine from '../../../../UI-components/loaderThreeLine/LoaderThreeLine';
import MyButton from '../../../../UI-components/button/MyButton';
import { RiDeleteBin6Line } from 'react-icons/ri';
import SimpleModal from '../../../../UI-components/simpleModal/simpleModal';
import { Navigate, useNavigate } from 'react-router-dom';

const EmployeeDetails = () => {

    const state = useSelector(state => state.employeesPage)
    const { ...employeeData } = useSelector(state => state.employeesPage.employeeData)
    console.log(employeeData)
    const { ...actions } = employeesSlice.actions;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getOneUser(state.userId))
    }, [])
    const deleteEmployee = (id) => {
        dispatch(deleteUser(id))
    }
    useEffect(() => {
        if (state.deleteNavigate) {
            navigate('/employees')
        }
        dispatch(actions.getDeleteNavigate(false))
    }, [state.deleteNavigate])

    return (
        <div className={s.employeeDetailsPage}>
            {state.getOne.loading ?
                <div className={s.loaderWrapper}><LoaderThreeLine /></div>
                :
                <div className={s.employeeDetailsWrapper}>
                    <div className={s.employeeDetails}>
                        <div className={s.personalInfo}>
                            <h3 className={s.personalInfoTitle}>Personal information and contacts</h3>
                            <div className={s.name}>{employeeData.surname} {employeeData.name}</div>
                            <TitleInfoBlock className={s.titleInfoBlock} title={'email:'} info={employeeData.email} />
                            <TitleInfoBlock className={s.titleInfoBlock} title={'phone number:'} info={employeeData.mobileNumber} />
                            <TitleInfoBlock className={s.titleInfoBlock} title={'birthDate:'} info={birthDateSplit(employeeData.birthDate)} />
                            <TitleInfoBlock className={s.titleInfoBlock} title={'gender:'} info={employeeData.gender} />
                            <TitleInfoBlock className={s.titleInfoBlock} title={'address:'} info={employeeData.address} />
                        </div>
                        <div className={s.employeeInfo}>
                            <h3 className={s.employeeInfoTitle}>Information as an employee</h3>
                            <TitleInfoBlock className={s.titleInfoBlock} title={'department:'} info={employeeData.department} />
                            <TitleInfoBlock className={s.titleInfoBlock} title={'position:'} info={employeeData.position} />
                            <TitleInfoBlock className={s.titleInfoBlock} title={'role:'} info={employeeData.role} />
                            <TitleInfoBlock className={s.titleInfoBlock} title={'startDate:'} info={birthDateSplit(employeeData.startDate)} />
                        </div>
                        <SimpleModal isLoading={state.deleteUserLoading} isSuccess={state.deleteUserSuccess}
                            onClickBtn={() => deleteEmployee(employeeData.id)} onClickBtn2={() => dispatch(actions.getDeleteUserSuccess(false))}
                            width={'300px'} height={'200px'} titleButton={'Yes'} titleButton2={'No'}>
                            <div style={{ fontSize: '16px', textAlign: 'center' }}>
                                Do you really want to delete employee {employeeData.name} {employeeData.surname} ?</div>
                        </SimpleModal>
                    </div>
                    <MyButton onClick={() => dispatch(actions.getDeleteUserSuccess(true))} title={'Delete Employee'} displayMyButton={'block'} padMyButton={'20px 50px 0px 0px'} gap={'10px'}
                        icon={<RiDeleteBin6Line />} col={'red'} bg={'white'} bor={'1px solid grey'} />
                </div>
            }
        </div>
    );
}

export default EmployeeDetails;
