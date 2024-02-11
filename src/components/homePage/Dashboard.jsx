import React from 'react';
import s from './Dashboard.module.scss';
import welcome from './../../assets/icon/dashboard/welcome.webp';
import hi from './../../assets/icon/dashboard/hi.png';
import { useTranslation } from 'react-i18next';
const Dashboard = () => {

    const { t, i18n } = useTranslation();

    return (
        <>
            <div className={s.dashboard}>
                <div className={s.wrapper}>
                    <div className={s.welcomeBlock}>
                        <h1 className={s.title}>{t('dashboard.welcome')}</h1>
                        <img className={s.hiImg} src={hi} alt='Hi' />
                    </div>
                    <div className={s.imgWrapper}>
                        <img className={s.image} src={welcome} alt='Banner welcome' />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
