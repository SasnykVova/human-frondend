import React, { useEffect } from 'react';
import s from './../AllJobs.module.scss';
import LoaderThreeLine from '../../../../UI-components/loaderThreeLine/LoaderThreeLine';
import { NavLink, useLocation } from 'react-router-dom';
import Vacancy from '../../vacancy/Vacancy';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../../../../toolkitRedux/reducer/jobsSlice';
import { useState } from 'react';


const Inactive = () => {

    const state = useSelector(state => state.jobsPage)
    const dispatch = useDispatch();
    const location = useLocation();

    // const [ status, setStatus ] = useState('');

    // const strTransform = (str) => {
    //     return str.split('/')[2].toUpperCase();
    // }
    
    const limit = state.limit
    const page = state.page
    const status = location.pathname.split('/')[2].toUpperCase();

    // useEffect(() => {
    //     setStatus(strTransform(location.pathname))
    // }, [location.pathname])

    useEffect(() => {
        dispatch(getJobs({status, limit, page}))
    }, [limit, page, dispatch, status ])

    return (
        <div className={s.jobs} >
            <div className={s.itemBlock}>
                {state.getJobs.loading
                    ?
                    <div className={s.loaderThreeLine}><LoaderThreeLine /></div>
                    :
                    state.vacancyData.map(v => 
                    <NavLink 
                        onClick={() => localStorage.setItem('jobId', v.id)}
                        to={`/jobs/all/${v.id}/candidates`}><Vacancy key={v.id} _id={v._id} assignedTo={v.assignedTo
                    } desk={v.desk} position={v.position} description={v.description} location={v.location} department={v.department}
                        createdBy={v.createdBy} status={v.status} salaryMax={v.salaryMax} salaryMin={v.salaryMin} deadlineDate={v.deadlineDate}
                        createdAt={v.createdAt} /></NavLink>)}
            </div>
        </div>
    );
}

export default Inactive;
