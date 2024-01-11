import React from 'react';
import s from './SearchPanel.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import LoaderThreeLine from '../loaderThreeLine/LoaderThreeLine';
import { jobsSlice } from '../../toolkitRedux/reducer/jobsSlice';
import { candidatesSlice } from '../../toolkitRedux/reducer/candidatesSlice';



const SearchPanel = (props) => {

    const stateCandidates = useSelector(state => state.candidatesPage)
    const actionsCandidates = candidatesSlice.actions;
    const dispatch = useDispatch();
    const actions = jobsSlice.actions;
    
    console.log(props)
    const handleClick = (data) => {
        const userName = `${data.name} ${data.surname}`
        dispatch(actionsCandidates.setSeachCandidateName(userName))
        dispatch(actionsCandidates.deleteUserNameData())
        dispatch(actions.setCandidateData(data))
    }

    return (
        <>
            <div className={s.searchPanel}>
                <div className={s.wrapper} style={{overflowY: stateCandidates.getSearchCandidate.loading ? 'hidden' : ''}}>
                    {
                         stateCandidates.getSearchCandidate.loading ? 
                            <LoaderThreeLine/>
                            :
                        <div>{props.data.map(c => 
                            <div 
                                onClick={() => handleClick({id: c.id, name: c.name, surname: c.surname})}
                                className={s.candidate}
                                key={c.id}    
                            >{c.name} {c.surname}
                            </div>)}
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default SearchPanel;
