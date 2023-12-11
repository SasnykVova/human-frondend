import React, { useState } from 'react';
import s from './Candidates.module.scss';
import { ReactComponent as Filter } from '../../assets/icon/candidates/filterIco.svg';
import { ReactComponent as Arrow } from '../../assets/icon/candidates/arrow.svg';
import Candidate from './candidate/Candidate';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const FilterParametersBlock = (props) => {
    return (
        <ul className={s.filterParametersBlock__list}>
            <li className={s.filterParametersBlock__item}>
                <div className={s.filterParametersBlock__itemTitle}>Candidate Name</div>
                <Arrow className={s.filterParametersBlock__itemArrow} width='12' height='12' />
            </li>
            <li className={s.filterParametersBlock__item}>
                <div className={s.filterParametersBlock__itemTitle}>Rating</div>
                <Arrow className={s.filterParametersBlock__itemArrow} width='12' height='12' />
            </li>
            <li className={s.filterParametersBlock__item}>
                <div className={s.filterParametersBlock__itemTitle}>Stages</div>
                <Arrow className={s.filterParametersBlock__itemArrow} width='12' height='12' />
            </li>
            <li className={s.filterParametersBlock__item}>
                <div className={s.filterParametersBlock__itemTitle}>Applied date</div>
                <Arrow className={s.filterParametersBlock__itemArrow} width='12' height='12' />
            </li>
            <li className={s.filterParametersBlock__item}>
                <div className={s.filterParametersBlock__itemTitle}>Owner</div>
                <Arrow className={s.filterParametersBlock__itemArrow} width='12' height='12' />
            </li>
        </ul>
    )
}
const Candidates = () => {

    const [candidates, setCandidate] = useState([
        { id: "1", candidateName: 'Cameron Williamson', rating: '4.7', stage: 'Shortlist', date: '01 March, 2022', owner: 'Annette Black', },
        { id: "2", candidateName: 'Savannah Nguyen', rating: '2.7', stage: 'Preinterview', date: '03 March, 2022', owner: 'Courtney Henry', },
        { id: "3", candidateName: 'Darlene Robertson', rating: '0.0', stage: 'Interview', date: '04 March, 2022', owner: 'Arlene McCoy', },
        { id: "4", candidateName: 'Leslie Alexander', rating: '4.9', stage: 'Test', date: '05 March, 2022', owner: 'Jane Cooper', },
        { id: "5", candidateName: 'Albert Flores', rating: '5.0', stage: 'Design Chalange', date: '06 March, 2022', owner: 'Bessie Cooper', },
        { id: "6", candidateName: 'Volodymyr Sasnyk', rating: '5.0', stage: 'Applied', date: '06 March, 2022', owner: 'Vasyl Malion', },
    ]);
    const state = useSelector(state => state.auth)
    return (
        <div className={s.candidates}>
            {state.token === null 
            ?
            <Navigate to={'/login'}/>
            :
            <div className={s.candidates__wrapper}>
                <div className={s.candidates__titleBlock}>
                    <h2 className={s.candidates__title}>Candidates</h2>
                    <div className={s.candidates__filterBlock}>
                        <button className={s.candidates__btn}>
                            <Filter className={s.candidates__btnIco} width='24px' height='24px' />
                            <div className={s.candidates__btnText}>Filter</div>
                        </button>
                    </div>
                </div>
                <div className={s.candidates__numberBlock}>
                    <h3 className={s.candidates__numberTitle}>Total Candidates</h3>
                    <div className={s.candidates__number}>20</div>
                </div>
                <div className={s.filterParametersBlock}>
                    <FilterParametersBlock />
                    <div className={s.candidateBlock}>
                        {candidates.map(c => <Candidate key={c.id} setCandidate={setCandidate} name={c.candidateName} rating={c.rating} stage={c.stage} date={c.date} owner={c.owner} />)}
                    </div>
                </div>
            </div>
}
        </div>
    );
}

export default Candidates;
