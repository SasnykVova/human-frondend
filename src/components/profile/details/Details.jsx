import React from 'react';
import s from './Details.module.scss';
import InfoBlock from './infoBlock/InfoBlock';
import birthDateSplit from './../../../assets/common/birthDateSplit';
import { useTranslation } from 'react-i18next';

const Details = () => {

    const userInfoString = localStorage.getItem('userInfo')
    const userInfoData = JSON.parse(userInfoString)
           
    const { t } = useTranslation();

    const persInfoData = [
        {titleKey: t("profile.name"), value: userInfoData.name},
        {titleKey: t("profile.surname"), value: userInfoData.surname},
        {titleKey: t("profile.genderTitle"), value: userInfoData.gender === 'MALE' ? t("profile.gender.MALE") : t("profile.gender.FEMALE")},
        {titleKey: t("profile.birthDate"), value: birthDateSplit(userInfoData.birthDate)},
    ]
    const contactInfoData = [
        {titleKey: t("profile.email"), value: userInfoData.email},
        {titleKey: t("profile.mobile"), value: userInfoData.mobileNumber},
        {titleKey: t("profile.address"), value: userInfoData.address},
    ]
    const workInfoData = [
        {titleKey: t("profile.department"), value: userInfoData.department},
        {titleKey: t("profile.position"), value: userInfoData.position},
        {titleKey: t("profile.startDate"), value: birthDateSplit(userInfoData.startDate)},
    ]
    

    return (
        <>
            <div className={s.details}>
                <div className={s.wrapper}>
                    <div className={s.personalInfo}>
                        <h3 className={s.title}>{t("profile.personalInfo")}</h3>
                        <InfoBlock data={persInfoData}/>
                        <h3 className={s.title}>{t("profile.contactInfo")}</h3>
                        <InfoBlock data={contactInfoData}/>
                        <h3 className={s.title}>{t("profile.workInfo")}</h3>
                        <InfoBlock data={workInfoData}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Details;
