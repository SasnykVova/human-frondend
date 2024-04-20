import React from 'react';
import s from './Timeline.module.scss';
import InfoBlock from '../../../profile/details/infoBlock/InfoBlock';
import { useSelector } from 'react-redux';
import birthDateSplit from '../../../../assets/common/birthDateSplit';
import { useTranslation } from 'react-i18next';



const Timeline = () => {

    const { t } = useTranslation();
    const state = useSelector(state => state.jobsPage)
    const jobDetails = state.jobDetails;
    console.log(jobDetails)
    console.log(state.getJob.loading)



    const timeLineData = [
        {titleKey: t("vacancies.vacancyDetails.createdAt"), value: birthDateSplit(jobDetails.createdAt)},
        {titleKey: t("vacancies.vacancyDetails.deadlineDate"), value: birthDateSplit(jobDetails.deadlineDate)},
        {titleKey: t("vacancies.vacancyDetails.closedAt"), value: '-'},
    ]
    const hiringTeam = [
        {titleKey: t("vacancies.vacancyDetails.createdBy"), value: `${jobDetails?.createdBy?.name} ${jobDetails?.createdBy?.surname}`},
        {titleKey: t("vacancies.vacancyDetails.assignedTo"), value: `${jobDetails?.assignedTo?.name} ${jobDetails?.assignedTo?.surname}`},
    ]

    return (
        <>
            <div className={s.timeline}>
                <div className={s.wrapper}>
                    <h3 className={s.title}>{t("vacancies.vacancyDetails.timeline")}</h3>
                    <InfoBlock data={timeLineData}/>
                    <h3 className={s.title}>{t("vacancies.vacancyDetails.hiringTeam")}</h3>
                    <InfoBlock data={hiringTeam}/>
                </div>
            </div>
        </>
    );
}

export default Timeline;
