import React, { useEffect, useState } from 'react';
import s from './Candidates.module.scss';
import Stage from './stage/Stage';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { updateTask } from '../../../../toolkitRedux/reducer/jobsSlice';
import { useTranslation } from 'react-i18next';

const Candidates = () => {

    const state = useSelector(state => state.jobsPage);
    const dispatch = useDispatch();
    const jobDetails = state.jobDetails;
    const location = useLocation();

    const vacancyId = location.pathname.split("/")[3];

    let shortListDate = state.tasks.filter((task) => task.column === 'SHORTLIST')
    let preinterviewListDate = state.tasks.filter((task) => task.column === 'PREINTERVIEW')
    let interviewListDate = state.tasks.filter((task) => task.column === 'INTERVIEW')
    let testListDate = state.tasks.filter((task) => task.column === 'TEST')
    let appliedListDate = state.tasks.filter((task) => task.column === 'APPLIED')
    let notAppliedListDate = state.tasks.filter((task) => task.column === 'NOT_APPLIED')

    console.log(shortListDate)

    // const [ shortListLocalDate, setShortListLocalDate ] = useState();
    const { t } = useTranslation();

    const [stages, setStages] = useState([
        {id: 1, title: t("vacancies.vacancyDetails.stages.SHORTLIST"), stage: 'Shortlist', color: '#FFA600',taskCount: shortListDate.length,items: shortListDate},
        {id: 2, title: t("vacancies.vacancyDetails.stages.PREINTERVIEW"),stage: 'Pre-interview', color: '#56CCF2',taskCount: preinterviewListDate.length, items: preinterviewListDate},
        {id: 3, title: t("vacancies.vacancyDetails.stages.INTERVIEW"),stage: 'Interview', color: '#FF5630',taskCount: interviewListDate.length,items: interviewListDate},
        {id: 4, title: t("vacancies.vacancyDetails.stages.TEST"),stage: 'Test', color: '##377DFF',taskCount: testListDate.length,items: testListDate},
        {id: 5, title: t("vacancies.vacancyDetails.stages.APPLIED"),stage: 'Applied', color: '#38CB89',taskCount: appliedListDate.length,items: appliedListDate},
        {id: 6, title: t("vacancies.vacancyDetails.stages.NOT_APPLIED"),stage: 'Not applied', color: '#333333',taskCount: notAppliedListDate.length,items: notAppliedListDate},
    ])

    const [taskId, setTaskId] = useState('');
    const [startIndexBoard, setStartIndexBoard] = useState('')
    const [currentDesk, setCurrentDesk] = useState('');
    console.log(taskId)
    console.log(currentDesk)
    
    
    const handleDragStart = (e, taskId) => {
        setTaskId(taskId)
    }
    const handleDragLeave = (e, item, column) => {
        
    }
    const handleDragOver = (e) => {
        e.preventDefault();
    }
    const handleOnDrop = (e, index, id, startIndex) => {
        e.preventDefault();
        let taskId = id;
        let columnUpper = stages[index].stage.toUpperCase();
        let column = ''
        let splitTitle = (str) => {
            if(str === 'PRE-INTERVIEW') {
                return column = str.slice(0, 3) + str.slice(4, 13)
            } else if(str === 'NOT APPLIED') {
                return column = str.replace(/ /g, '_')
            } else {
                return column = str
            }
        }
        splitTitle(columnUpper)
        console.log(column)
        const newStageForfilter = stages.map(stage => {
            const updateItems = stage.items.filter(item => item.id !== taskId) 
            return {...stage, items: updateItems}
        })
        newStageForfilter[startIndex].taskCount = newStageForfilter[startIndex].taskCount - 1
        newStageForfilter[index].taskCount = newStageForfilter[index].taskCount + 1
        setStages(newStageForfilter)
        let filterArray = stages[startIndex].items.filter(item => item.id === taskId)
        let pushElement = filterArray[0]
        newStageForfilter[index].items.push(pushElement)
        setStages(newStageForfilter)
        dispatch(updateTask({vacancyId, taskId, column}))
    }
    
    const handleDragEnd = (e, item, column) => {
    }
    const handleOnDrag = (e, startIndexBoard) => {
        setStartIndexBoard(startIndexBoard)
    }

    // const candidatesClasses = {state.updateTask.loading ? `${s.candidates} ${s.candidatesUpdateTask}` : `${s.candidates}`}
    console.log(state.getJob.loading)
    return (
        <>
            <div className={state.updateTask.loading 
                ? `${s.candidates} ${s.candidatesUpdateTask}` : (state.getJob.loading ? `${s.candidates} ${s.candidatesUpdateTask}` : `${s.candidates}`)}>
                <div className={s.wrapper}>
                        <Stage 
                            key={stages[0].id}
                            index={'0'} 
                            stage={stages[0].stage}
                            title={stages[0].title}
                            color={stages[0].color}
                            taskCount={stages[0].taskCount}
                            items={stages[0].items}
                            draggable={true}
                            onDragStartTask={(e, taskId) => handleDragStart(e, taskId)}
                            onDragLeave={(e, item, column) => handleDragLeave(e, item, column)}
                            onDragOver={(e, column) => handleDragOver(e, column)}
                            onDragEnd={(e, item, column) => handleDragEnd(e, item, column)}
                            onDrop={(e, stageIndex) => handleOnDrop(e, stageIndex, taskId, startIndexBoard)}
                            onDrag={(e, startIndex) => handleOnDrag(e, startIndex)}
                        >
                        </Stage>
                        <Stage 
                            key={stages[1].id} 
                            index={'1'} 
                            stage={stages[1].stage}
                            title={stages[1].title}
                            color={stages[1].color}
                            taskCount={stages[1].taskCount}
                            items={stages[1].items}
                            draggable={true}
                            onDragStartTask={(e, item) => handleDragStart(e, item)}
                            onDragLeave={(e, item, column) => handleDragLeave(e, item, column)}
                            onDragOver={(e, item, column) => handleDragOver(e, item, column)}
                            onDragEnd={(e, item, column) => handleOnDrop(e, item, column)}
                            onDrop={(e, stageIndex) => handleOnDrop(e, stageIndex, taskId, startIndexBoard)}
                            onDrag={(e, startIndex) => handleOnDrag(e, startIndex)}
                        >
                        </Stage>
                        <Stage 
                            key={stages[2].id} 
                            index={'2'} 
                            stage={stages[2].stage}
                            title={stages[2].title}
                            color={stages[2].color}
                            taskCount={stages[2].taskCount}
                            items={stages[2].items}
                            draggable={true}
                            onDragStartTask={(e, item) => handleDragStart(e, item)}
                            onDragLeave={(e, item, column) => handleDragLeave(e, item, column)}
                            onDragOver={(e, item, column) => handleDragOver(e, item, column)}
                            onDragEnd={(e, item, column) => handleOnDrop(e, item, column)}
                            onDrop={(e, stageIndex) => handleOnDrop(e, stageIndex, taskId, startIndexBoard)}
                            onDrag={(e, startIndex) => handleOnDrag(e, startIndex)}
                        >
                        </Stage>
                        <Stage 
                            key={stages[3].id} 
                            index={'3'} 
                            stage={stages[3].stage}
                            title={stages[3].title}
                            color={stages[3].color}
                            taskCount={stages[3].taskCount}
                            items={stages[3].items}
                            draggable={true}
                            onDragStartTask={(e, item) => handleDragStart(e, item)}
                            onDragLeave={(e, item, column) => handleDragLeave(e, item, column)}
                            onDragOver={(e, item, column) => handleDragOver(e, item, column)}
                            onDragEnd={(e, item) => handleOnDrop(e, item, currentDesk)}
                            onDrop={(e, stageIndex) => handleOnDrop(e, stageIndex, taskId, startIndexBoard)}
                            onDrag={(e, startIndex) => handleOnDrag(e, startIndex)}
                        >
                        </Stage>
                        <Stage 
                            key={stages[4].id} 
                            index={'4'} 
                            stage={stages[4].stage}
                            title={stages[4].title}
                            color={stages[4].color}
                            taskCount={stages[4].taskCount}
                            items={stages[4].items}
                            draggable={true}
                            onDragStartTask={(e, item) => handleDragStart(e, item)}
                            onDragLeave={(e, item, column) => handleDragLeave(e, item, column)}
                            onDragOver={(e, item, column) => handleDragOver(e, item, column)}
                            onDragEnd={(e, item) => handleOnDrop(e, item, currentDesk)}
                            onDrop={(e, stageIndex) => handleOnDrop(e, stageIndex, taskId, startIndexBoard)}
                            onDrag={(e, startIndex) => handleOnDrag(e, startIndex)}
                        >
                        </Stage>
                        <Stage 
                            key={stages[5].id} 
                            index={'5'} 
                            stage={stages[5].stage}
                            title={stages[5].title}
                            color={stages[5].color}
                            taskCount={stages[5].taskCount}
                            items={stages[5].items}
                            draggable={true}
                            onDragStartTask={(e, item) => handleDragStart(e, item)}
                            onDragLeave={(e, item, column) => handleDragLeave(e, item, column)}
                            onDragOver={(e, item, column) => handleDragOver(e, item, column)}
                            onDragEnd={(e, item) => handleOnDrop(e, item, currentDesk)}
                            onDrop={(e, stageIndex) => handleOnDrop(e, stageIndex, taskId, startIndexBoard)}
                            onDrag={(e, startIndex) => handleOnDrag(e, startIndex)}
                        >
                        </Stage>
                </div>
            </div>
        </>
    );
}

export default Candidates;
