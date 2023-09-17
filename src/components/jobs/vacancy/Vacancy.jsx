import React from 'react';
import s from './Vacancy.module.scss';
import someAvatar from '../../../assets/icon/jobs/vacancy/slack.svg';

const Vacancy = ({ ...data }) => {
    return (
        <div className={s.vacancy}>
            <div className={s.vacancy__wrapper}>
                <div className={s.vacancy__avatarData}>
                    <div className={s.vacancy__avatarWrapper}>
                        <img className={s.vacancy__avatar} src={someAvatar} alt='' />
                    </div>
                    <div className={s.vacancy__data}>{data.data.createData}</div>
                </div>
                <div className={s.vacancy__aboutVacancy}>
                    <div className={s.vacancy__title}>{data.data.title}</div>
                    <div className={s.vacancy__vacancyName}>Senior Product Designer</div>
                    <div className={s.vacancy__location}>{data.data.city}, {data.data.country}</div>
                    <div className={s.vacancy__description}>{data.data.description}</div>
                </div>
                <div className={s.vacancy__newCandidates}>
                    <div className={s.vacancy__newCandidatesAvatar}>avatar</div>
                    <div className={s.vacancy__totalCandidates}>122+ candidate</div>
                </div>
            </div>
        </div>
    );
}

export default Vacancy;
