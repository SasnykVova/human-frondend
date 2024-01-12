import React, { useEffect, useState } from "react";
import s from "./Task.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";
import SimpleModal from "../../../../../../UI-components/simpleModal/simpleModal";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTask,
  jobsSlice,
} from "../../../../../../toolkitRedux/reducer/jobsSlice";
import { useTranslation } from "react-i18next";

const Task = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const state = useSelector((state) => state.jobsPage);
  const dispatch = useDispatch();
  const actions = jobsSlice.actions;
  const [deleteTaskPanel, setDeleteTaskPanel] = useState(false);
  const location = useLocation();

  const vacancyId = location.pathname.split("/")[3];

  const id = props.taskId;

  // const { onClick, deleteTaskPanel } = props;
  const handleToggle = (togleValue) => {
    let result = togleValue === true ? false : true;
    setDeleteTaskPanel(result);
  };
  const handleClosedModal = (e) => {
    dispatch(actions.setDeleteModal(false));
  };
  useEffect(() => {
    if(state.deleteTask.success) {
        dispatch(actions.setDeleteModal(false))
    }
  }, [state.deleteTask.success])

  return (
    <>
      <div
        id={`${props.taskId}`}
        className={s.task}
        onClick={(e) => handleToggle(deleteTaskPanel)}
        draggable={props.draggable}
        // onDragOver={(e) => props.onDragOver(e)}
        // onDragLeave={(e) => props.onDragLeave(e)}
        onDragStart={(e) => props.onDragStartTask(e, props.taskId)}
        // onDragEnd={(e) => props.onDragEnd(e)}
        // onDrop={(e) => props.onDrop(e)}
      >
        <SimpleModal
          isLoading={state.deleteTaskloading}
          isSuccess={state.deleteTask.deleteModal}
          onClickBtn={() => dispatch(deleteTask({vacancyId, id}))}
          onClickBtn2={(e) => handleClosedModal(e)}
          width={"300px"}
          height={"200px"}
          titleButton={t("candidates.candidateDetails.yes")}
          titleButton2={t("candidates.candidateDetails.no")}
        >
          <div style={{ fontSize: "16px", textAlign: "center" }}>
            Do you really want to delete the task?
          </div>
        </SimpleModal>
        <FaUserCircle size={25} className={s.icon} />
        <div className={s.infoBlock}>
          <div className={s.userName}>
            {props.name} {props.surname}
          </div>
          <div className={s.position}>{props.position}</div>
        </div>
      </div>
      {deleteTaskPanel && (
        <div className={s.deleteTaskPanel}>
          <div
            className={s.iconWrapper}
            onClick={() => navigate(`/candidates/${props.id}`)}
          >
            <div className={s.toolTipShow}>Show candidate</div>
            <FaRegUserCircle className={s.profileButton} size={40} />
          </div>
          <div
            className={s.iconWrapper}
            onClick={() => dispatch(actions.setDeleteModal(true))}
          >
            <div className={s.toolTipDelTask}>Delete task</div>
            <MdDeleteOutline className={s.deleteButton} size={40} />
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
