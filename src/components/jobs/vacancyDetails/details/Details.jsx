import React from 'react';
import s from './Details.module.scss';
import { useSelector } from 'react-redux';
import { GoDotFill } from "react-icons/go";
import InfoBlock from './../../../profile/details/infoBlock/InfoBlock';
import { useTranslation } from 'react-i18next';


const Details = () => {

    const { t } = useTranslation();
    const state = useSelector(state => state.jobsPage)
    const jobDetails = state.jobDetails;

    const generalInfo = [
        {titleKey: t("vacancies.vacancyDetails.position"), value: jobDetails.position},
        {titleKey: t("vacancies.vacancyDetails.department"), value: jobDetails.department},
        {titleKey: t("vacancies.vacancyDetails.description"), value: jobDetails.description},
    ]
    const additionalInfo = [
        {titleKey: t("vacancies.vacancyDetails.salaryMin"), value: `${jobDetails.salaryMin}${'$'}`},
        {titleKey: t("vacancies.vacancyDetails.salaryMax"), value: `${jobDetails.salaryMax}${'$'}`},
        {titleKey: t("vacancies.vacancyDetails.location"), value: jobDetails.location},
    ]

    return (
        <>
            <div className={s.details}>
                <div className={s.wrapper}>
                    <div className={s.statusBlock}>
                        <div className={s.statusTitle}>{t("vacancies.vacancyDetails.vacancyStatus")}</div>
                        {jobDetails.status === null
                            ?
                            ''
                            :
                            jobDetails.status === 'ACTIVE' 
                            ?
                            <div className={s.status}><GoDotFill size={30} color='#38CB89' />{t("vacancies.vacancyDetails.vacancyStatusVal.ACTIVE")}</div>
                            :
                            jobDetails.status === 'INACTIVE' 
                            ?
                            <div className={s.status}><GoDotFill size={30} color='red' />{t("vacancies.vacancyDetails.vacancyStatusVal.INACTIVE")}</div>
                        : ''}
                    </div>
                    <div className={s.infoBlock}>
                        <h3 className={s.title}>{t("vacancies.vacancyDetails.generalInfo")}</h3>
                        <InfoBlock data={generalInfo}/>
                        <h3 className={s.title}>{t("vacancies.vacancyDetails.additionalInfo")}</h3>
                        <InfoBlock data={additionalInfo}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Details;
