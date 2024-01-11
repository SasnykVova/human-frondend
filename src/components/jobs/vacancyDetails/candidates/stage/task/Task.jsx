import React from 'react';
import s from './Task.module.scss';
import { FaUserCircle } from "react-icons/fa";

const Task = (props) => {
    return (
        <>
            <div 
                id={`${props.taskId}`}
                className={s.task} 
                draggable={props.draggable}
                // onDragOver={(e) => props.onDragOver(e)}
                // onDragLeave={(e) => props.onDragLeave(e)}
                onDragStart={(e) => props.onDragStartTask(e, props.taskId)}
                // onDragEnd={(e) => props.onDragEnd(e)}
                // onDrop={(e) => props.onDrop(e)}
            >
                <FaUserCircle size={25} className={s.icon}/>
                <div className={s.infoBlock}>
                    <div className={s.userName}>{props.name} {props.surname}</div>
                    <div className={s.position}>{props.position}</div>
                </div>
            </div>
        </>
    );
}

export default Task;
