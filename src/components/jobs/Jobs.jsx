import React, { useState } from 'react';
import s from './Jobs.module.scss';
// import Vacancy from './vacancy/Vacancy';
// import { ReactComponent as Add } from '../../assets/icon/jobs/vacancy/add.svg';
// import { ReactComponent as Close } from '../../assets/icon/jobs/vacancy/close.svg';
import { NavLink, Route, Routes } from 'react-router-dom';
import './jobs.scss';
import MyButton from '../../UI-components/button/MyButton';
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { addJob, jobsSlice } from '../../toolkitRedux/reducer/jobsSlice';
import AllJobs from './activeJobs/AllJobs';
import AddJobInput from './activeJobs/addJobInput/AddJobInput';
import Modal from '../../UI-components/modal/modal';
import Loader from '../../UI-components/loader/Loader';
import MyInput from '../../UI-components/input/MyInput';
import ActiveJobs from './activeJobs/active/ActiveJobs';
import InactiveJobs from './activeJobs/inactive/InactiveJobs';


const Jobs = (props) => {
    // const changeValue = (text) => {
    //     props.newPostTextAC(text);
    // }
    // const [createNewVacancy, setCreateNewVacancy] = useState(false);

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

    const dispatch = useDispatch();
    const state = useSelector(state => state.jobsPage)
    const actions = jobsSlice.actions
    console.log(state)

    const addJobFunc = () => {
        console.log(position, description)
        dispatch(addJob({ position, description, department, location, assignedTo, salaryMax,salaryMin, deadlineDate }))
    }
    // function solution(str){
    //     let res = str.split('').reverse().join('')
    //     return res
    //   }
 
    
    //   console.log(solution('worl'))
    // let arr1 = [1, 2, 3, 'hello', 7, 'world']
    // function solution(arr){
    //     return arr.map(m => <div>{m}</div>)
    //   }

    //   console.log(solution([1, 2, 3, 'hello', 7, 'world']));

    return (
        <div className={s.jobs}>
            <div className={s.jobs__wrapper}>
                <div className={s.jobs__filterBlock}>
                    <div className={s.jobs__title}>
                        <div className={s.jobs__text}>Vacancies</div>
                    </div>
                    <div className={s.jobs__filterBlock}>
                        <MyButton icon={<AiOutlinePlus size={25}/>} onClick={() => dispatch(actions.setCreateNewVacancy(true))} padMyButton={'20px 20px 0px 0px'} gap={'10px'} title={'Create New Job'}/>
                    </div>
                </div>
                {state.createNewVacancy ?
                <Modal 
                    onClickBtn={addJobFunc} 
                    onClick={() => dispatch(actions.setCreateNewVacancy(false))} 
                    title={'Add new vacancy'} 
                    fontSize={'20px'}
                    titleButton={state.addJob.loading ? <Loader width={'30px'} height={'30px'} /> : 'Add Vacancy'}
                    textError={state.error ? <div style={{ color: 'red', fontSize: '18px' }}>{state.error}</div> : ''}>
                    <div className={s.modalBlock}>
                        <AddJobInput className={s.input} onChange={(value) => setPosition(value)} value={position} label={'position'} />
                        <AddJobInput className={s.input} onChange={(value) => setDepartment(value)} value={department} label={'department'} />
                        {/* <AddJobInput className={s.input} onChange={(value) => setAssignedTo(value)} value={assignedTo} label={'assignedTo'} /> */}
                        <AddJobInput className={s.input} onChange={(value) => setSalaryMin(value)} value={salaryMin} label={'salaryMin'} />
                        <MyInput className={s.input} onChange={(value) => setDeadlineDate(value)} value={deadlineDate} type={'date'} label={'deadlineDate'} />
                    </div>
                    <div className={s.modalBlock}>
                        <AddJobInput className={s.input} onChange={(value) => setDescription(value)} value={description} label={'description'} />
                        <AddJobInput className={s.input} onChange={(value) => setLocation(value)} value={location} label={'location'} />
                        <AddJobInput className={s.input} onChange={(value) => setSalaryMax(value)} value={salaryMax} label={'salaryMax'} />
                    </div>
                </Modal>
                : ''}
                <div id='statusBlock-menu' className="statusBlock">
                    <NavLink className={"activeJobs"} to={"/jobs/all"}>All</NavLink>
                    <NavLink className={"completed"} to={"/jobs/active"}>Active</NavLink>
                    <NavLink className={"unfinisheds"} to={"/jobs/inactive"}>Inactive</NavLink>
                </div>
                <div className={s.jobs__line}></div>
                <Routes>
                    <Route path={"all"} element={<AllJobs/>}/>
                    <Route path={"active"} element={<ActiveJobs/>}/>
                    <Route path={"inactive"} element={<InactiveJobs/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default Jobs;
