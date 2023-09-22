import React, { useState } from 'react';
import s from './Jobs.module.scss';
import Vacancy from './vacancy/Vacancy';
import { ReactComponent as Add } from '../../assets/icon/jobs/vacancy/add.svg';
import { ReactComponent as Close } from '../../assets/icon/jobs/vacancy/close.svg';

const jobsData = [
    { id: 1, avatar: '', createData: '5 july', title: 'Design', vacancy: 'Senior Product Designer', city: 'Dolyna', country: 'Ukraine', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry' },
    { id: 2, avatar: '', createData: '5 july', title: 'Design', vacancy: 'Senior Product Designer', city: 'Dolyna', country: 'Ukraine', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry' },
    { id: 3, avatar: '', createData: '5 july', title: 'Design', vacancy: 'Senior Product Designer', city: 'Dolyna', country: 'Ukraine', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry' },
    { id: 4, avatar: '', createData: '5 july', title: 'Design', vacancy: 'Senior Product Designer', city: 'Dolyna', country: 'Ukraine', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry' },
    { id: 5, avatar: '', createData: '5 july', title: 'Design', vacancy: 'Senior Product Designer', city: 'Dolyna', country: 'Ukraine', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry' },
    { id: 6, avatar: '', createData: '5 july', title: 'Design', vacancy: 'Senior Product Designer', city: 'Dolyna', country: 'Ukraine', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry' },
    { id: 7, avatar: '', createData: '5 july', title: 'Design', vacancy: 'Senior Product Designer', city: 'Dolyna', country: 'Ukraine', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry' },
];


const Jobs = (props) => {
    const changeValue = (text) => {
        props.newPostTextAC(text);
    }
    const [createNewVacancy, setCreateNewVacancy] = useState(false);
    return (
        <div className={s.jobs}>
            {createNewVacancy ?
                <div onClick={() => {setCreateNewVacancy(false)}} className={s.createJobModal}>
                    <div onClick={e => e.stopPropagation()} className={s.createJobModal__content}>
                        <Close onClick={() => {setCreateNewVacancy(false)}} className={s.createJobModal__closeBtn} width={'60px'} height={'60px'}/>
                        <form className={s.createJobModal__form}>
                            <input className={s.createJobModal__inputFirst}></input>
                            <input className={s.createJobModal__inputSec}></input>
                            <button className={s.createJobModal__btn}>Create</button>
                        </form>
                    </div>
                </div>
                : ''}

            <div className={s.jobs__filterBlock}>
                <div className={s.jobs__title}>
                    <div className={s.jobs__text}>Jobs</div>
                </div>
                <div className={s.jobs__filterBlock}>
                    <div className={s.jobs__sort}>Sort by</div>
                    <div className={s.jobs__status}>Status</div>
                </div>
            </div>
            <div className={s.jobs__statusBlock}>
                <div>Active Jobs</div>
                <div>Completed</div>
                <div>Unfinished</div>
            </div>
            <div className={s.jobs__line}></div>
            <div></div>
            <div className={s.itemBlock}>
                {jobsData.map(v => <Vacancy key={v.id} data={v} />)}
                <div onClick={() => {setCreateNewVacancy(true)}} className={s.itemBlock__newVacancy}>
                    <Add className={s.itemBlock__newVacancyBtnAdd} />
                    <text className={s.itemBlock__newVacancyText}>Create New Job</text>
                </div>
            </div>
            <input onChange={(e) => changeValue(e.target.value)} value={props.newPostText}></input>
        </div>
    );
}

export default Jobs;
