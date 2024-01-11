import React from 'react';
import s from './Profile.module.scss';
import { NavLink, Route, Routes } from 'react-router-dom';
import Details from './details/Details';
import UpdatePassword from './updatePassword/UpdatePassword';
import MainHeader from '../../UI-components/mainHeader/MainHeader';
import { useTranslation } from 'react-i18next';

const Profile = () => {

    const { t } = useTranslation();

    const navLinkData = [
        {className: 'navlink', to: '/profile/details', title: t("profile.tabs.details")},
        {className: 'navlink', to: '/profile/updatePass', title: t("profile.tabs.updatePassword")},
    ]

    return (
        <>
            <div className={s.profile}>
                <div className={s.wrapper}>
                    <h1>{t("profile.title")}</h1>
                    <MainHeader data={navLinkData}/>
                    <Routes>
                        <Route path='/details' element={<Details/>}/>
                        <Route path='/updatePass' element={<UpdatePassword/>}/>
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default Profile;
