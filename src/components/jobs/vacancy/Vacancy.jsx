import React from 'react';
import s from './Vacancy.module.scss';
import someAvatar from '../../../assets/icon/jobs/vacancy/slack.svg';
import birthDateSplit from './../../../assets/common/birthDateSplit';

const Vacancy = (props) => {
    return (
        <div className={s.vacancy}>
            <div className={s.vacancy__wrapper}>
                <div className={s.vacancy__avatarData}>
                    <div className={s.vacancy__avatarWrapper}>
                        <img className={s.vacancy__avatar} src={someAvatar} alt='' />
                    </div>
                    <div className={s.vacancy__data}>{birthDateSplit(props.createdAt)}</div>
                </div>
                <div className={s.vacancy__aboutVacancy}>
                    <div className={s.vacancy__title}>{props.position}</div>
                    <div className={s.vacancy__vacancyName}>{props.department}</div>
                    <div className={s.vacancy__location}>{props.location}</div>
                    <div className={s.vacancy__description}>{props.description}</div>
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
