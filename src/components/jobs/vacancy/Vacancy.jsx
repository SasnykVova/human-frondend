import React from 'react';
import s from './Vacancy.module.scss';
import someAvatar from '../../../assets/icon/jobs/vacancy/slack.svg';
import birthDateSplit from './../../../assets/common/birthDateSplit';
import { FaUserCircle } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const Vacancy = (props) => {

    const { t } = useTranslation();

    return (
        <div className={s.vacancy}>
            <div className={s.vacancy__wrapper}>
                <div className={s.vacancy__aboutVacancy}>
                    <div className={s.vacancy__vacancyName}>{props.position}</div>
                    <div className={s.vacancy__location}>{props.location}</div>
                    <div className={s.vacancy__description}>{props.description}</div>
                </div>
                <div className={s.vacancy__avatarData}>
                    <div className={s.vacancy__data}>{birthDateSplit(props.createdAt)}</div>
                    <div className={s.status} style={{color: props.status === 'ACTIVE' ? '#38CB89' : 'red'}}>{props.status === 'ACTIVE' ? t("vacancies.active") : t("vacancies.inactive")}</div>
                </div>
                <div className={s.vacancy__newCandidates}>
                    <FaUserCircle size={25} color='black'/> 
                    <div>{props.assignedTo.name} {props.assignedTo.surname}</div>
                </div>
            </div>
        </div>
    );
}

export default Vacancy;
