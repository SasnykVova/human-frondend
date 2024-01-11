import React, { useEffect, useState } from 'react';
import s from './Stage.module.scss';
import Task from './task/Task';
import { useSelector } from 'react-redux';

const Stage = (props) => {

    // const items = [
    //     {id: 1, name: 'Vlad', surname: 'Hainuk', position: 'HR'},
    //     {id: 1, name: 'Vlad', surname: 'Hainuk', position: 'HR'},
    // ]
    console.log(props)
    const [ localProps, setLocalProps] = useState()

    const state = useSelector(state => state.jobsPage);
    console.log(props.items)

    const column = props.stage.toUpperCase();
    
    const stageIndex = props.index

    return (
        <>
            <div 
                id={props.key} 
                className={s.stage}
                onDragOver={(e) => { 
                    props.onDragOver(e)}
                }
                // onDragLeave={(e) => props.onDragLeave(e)}
                // onDragStart={(e) => props.onDragStart(e)}
                // onDragEnd={(e) => props.onDragEnd(e)}
                onDrag={(e) => props.onDrag(e, stageIndex)}
                onDrop={(e) => {
                    props.onDrop(e, stageIndex)
                }}
            >   
                <div className={s.header}>
                    <div className={s.decorLine} style={{background: props.color}}></div>
                    <div className={s.infoBlock}>
                        <div className={s.title}>{props.title}</div>
                        <div className={s.taskCount}>{props.taskCount}</div>
                    </div>
                </div>
                <div className={s.task}>
                        {props.items.length === 0
                            ? 
                            ''
                            :
                            props.items.map(item => 
                                <Task
                                    onDragOver={(e, item) => props.onDragOver(e, item, column)}
                                    onDragLeave={(e, item, column) => props.onDragLeave(e, item, column)}
                                    onDragStartTask={(e, taskId) => props.onDragStartTask(e, taskId)}
                                    onDragEnd={(e, item) => props.onDragEnd(e, item, column)}
                                    onDrop={(e) => {
                                        debugger
                                        props.onDrop(e, stageIndex)
                                    }}
                                    draggable={props.draggable}
                                    key={item.candidate.id}
                                    taskId={item.id}
                                    name={item.candidate.name}
                                    surname={item.candidate.surname}
                                    position={item.candidate.position} 
                                />)
                        }
                </div>
            </div>
        </>
    );
}

export default Stage;
