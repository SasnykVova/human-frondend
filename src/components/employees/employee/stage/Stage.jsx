import React, { useEffect, useState } from 'react';
import s from './Stage.module.scss';
import './Stage.scss';
import { ReactComponent as Rectangle } from '../../../../assets/icon/candidates/Rectangle.svg';



const Stage = (props) => {
    const stageRectangle = [
        {id: '1'},
        {id: '2'},
        {id: '3'},
        {id: '4'},
        {id: '5'},
        {id: '6'},
    ];
    const [stage, setStage ] = useState ({
        title: '',
        color: '',
        stageNum: '',
    });

    const getStage = () => {
        switch(props.stage) {
            case 'Shortlist':
                return setStage({ title: 'Shortlist',color: 'secondary', stageNum: '1'});
            case 'Preinterview':
                return setStage({ title: 'Preinterview',color: 'yellow', stageNum: '2'});
            case 'Interview':
                return setStage({ title: 'Interview',color: 'orange', stageNum: '3'});
            case 'Test':
                return setStage({ title: 'Test',color: 'blue', stageNum: '4'});
            case 'Design Chalange':
                return setStage({ title: 'Design Chalange',color: 'l-green', stageNum: '5'});
            case 'Applied':
                return setStage({ title: 'Applied',color: 'green', stageNum: '6'});
            default:
                return {title: '', color: '', stageNum: ''}        
        }
    }
    useEffect(() => {
        getStage(props)
    }, [props])
    return (
        <div className={s.stage}> 
            <div className={s.title}>{stage.title}</div>
            <div className={s.rectangleWrapper}>
            {stageRectangle.map((r, index) => <Rectangle key={r.id} className={index < stage.stageNum ? `${stage.color}` : 'strock'} width="10" height="6" />)}</div>
        </div>
    );
}

export default Stage;