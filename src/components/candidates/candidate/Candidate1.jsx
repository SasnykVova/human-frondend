// import React, { useEffect, useState } from 'react';
// import s from './Candidate.module.scss';
// import './Candidate.scss';
// import { ReactComponent as Start } from '../../../assets/icon/candidates/star.svg';
// import { ReactComponent as Rectangle } from '../../../assets/icon/candidates/Rectangle.svg';



// const Stage = (props) => {
//     const stageRectangle = [
//         {id: '1'},
//         {id: '2'},
//         {id: '3'},
//         {id: '4'},
//         {id: '5'},
//         {id: '6'},
//     ];
//     const [stage, setStage ] = useState ({
//         title: '',
//         color: '',
//         stageNum: '',
//     });

//     const getStage = (props) => {
//         switch(props.stage) {
//             case 'Shortlist':
//                 return setStage({ title: 'Shortlist',color: 'secondary', stageNum: '1'});
//             case 'Preinterview':
//                 return setStage({ title: 'Preinterview',color: 'yellow', stageNum: '2'});
//             case 'Interview':
//                 return setStage({ title: 'Interview',color: 'orange', stageNum: '3'});
//             case 'Test':
//                 return setStage({ title: 'Test',color: 'blue', stageNum: '4'});
//             case 'Design Chalange':
//                 return setStage({ title: 'Design Chalange',color: 'l-green', stageNum: '5'});
//             case 'Applied':
//                 return setStage({ title: 'Applied',color: 'green', stageNum: '6'});
//             default:
//                 return {title: '', color: '', stageNum: ''}        
//         }
//     }
//     useEffect(() => {
//         getStage(props)
//     }, [props])
//     return (
//         <div>
//             <div className={s.candidate__stage}>{stage.title}</div>
//             <div className={s.candidate__rectangleWrapper}>
//             {stageRectangle.map((r, index) => <Rectangle key={r.id} className={index < stage.stageNum ? `${stage.color}` : 'strock'} width="10" height="6" />)}</div>
//         </div>
//     );
// }



// const Candidate = (props) => {

//     return (
//         <div className={s.candidate}>
//             <div className={s.candidate__wrapper}>
//                 <div className={s.candidate__candidateBlock}>
//                     <div className={s.candidate__candidateAvatar}></div>
//                     <div className={s.candidate__candidateName}>{props.name}</div>
//                 </div>
//                 <div className={s.candidate__ratingBlock}>
//                     <div className={s.candidate__ratingBlockWrapper}>
//                         <Start className={ props.rating > 0 ? s.candidate__starYellow : s.candidate__starGrey} />
//                         <div className={s.candidate__rating}>{props.rating}</div>
//                     </div>
//                 </div>
//                 <div className={s.candidate__stageBlock}>
//                     <Stage stage={props.stage}/>
//                 </div>
//                 <div className={s.candidate__date}>{props.date}</div>
//                 <div className={s.candidate__ownerBlock}>
//                     <div className={s.candidate__ownerAvatar}></div>
//                     <div className={s.candidate__ownerName}>{props.owner}</div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Candidate;
