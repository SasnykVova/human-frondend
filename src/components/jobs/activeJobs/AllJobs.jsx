import React, { useEffect } from 'react';
import s from './AllJobs.module.scss';
import Vacancy from '../vacancy/Vacancy';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs, jobsSlice } from '../../../toolkitRedux/reducer/jobsSlice';
import LoaderThreeLine from '../../../UI-components/loaderThreeLine/LoaderThreeLine';
import { actions } from './../../../toolkitRedux/reducer/employeesSlice';



const AllJobs = (props) => {

    const state = useSelector(state => state.jobsPage)
    const dispatch = useDispatch();
    const actions = jobsSlice.actions;

    const limit = state.limit
    const page = state.page
    const filter = state.getJobs.filter
    const onlyMine = state.getJobs.onlyMine


    useEffect(() => {
        dispatch(getJobs({limit, page, filter, onlyMine}))
    }, [limit, page, dispatch, state.addJob.success, filter, onlyMine])

    return (
        <div className={s.jobs} >
            <div className={s.itemBlock}>
                {state.getJobs.loading
                    ?
                    <div className={s.loaderThreeLine}><LoaderThreeLine /></div>
                    :
                    state.vacancyData.map(v => <NavLink onClick={() => dispatch(actions.setUserIdDetails(v.id))} to={`/jobs/all/${v.id}/candidates`}><Vacancy key={v.id} _id={v._id} assignedTo={v.assignedTo
                    } desk={v.desk} position={v.position} description={v.description} location={v.location} department={v.department}
                        createdBy={v.createdBy} status={v.status} salaryMax={v.salaryMax} salaryMin={v.salaryMin} deadlineDate={v.deadlineDate}
                        createdAt={v.createdAt} /></NavLink>)}
            </div>
        </div>
    );
}

export default AllJobs;
