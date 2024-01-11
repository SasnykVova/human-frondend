import React from 'react';
import s from './HeaderBlock.module.scss';
import MyButton from '../button/MyButton';
import { AiOutlinePlus } from 'react-icons/ai';
// import { useDispatch } from 'react-redux';
import SearchInput from '../input/search/SearchInput';
import CheckBoxInput from '../checkBoxInput/CheckBoxInput';
// import { jobsSlice } from '../../toolkitRedux/reducer/jobsSlice';
// import { candidatesSlice } from '../../toolkitRedux/reducer/candidatesSlice';



const HeaderBlock = (props) => {

    // const dispatch = useDispatch();
    // const actions = jobsSlice.actions;
    // const actionsCandidate = candidatesSlice.actions;

    // const [ searchJob, setSearchJob ] = useState('');
    // const [ isChecked, setIsChecked ] = useState(false);
    // console.log(isChecked)

    // const setFilter = (isChecked) => {
    //     return dispatch(actionsCandidate.setOnlyMine(isChecked ? '1' : ''))
    // }
    // const handleClick = (value) => {
    //     setIsChecked(value)
    //     setFilter(value)
    // }

    return (
        <>
            <div className={s.headerBlock}>
                <div className={s.titleBtnBlock}>
                    <div className={s.title}>
                        <div className={s.text}>{props.title}</div>
                    </div>
                    <div className={s.filterBlock}>
                        <MyButton
                            icon={<AiOutlinePlus size={25} />}
                            onClick={props.onClickMyButton}
                            gap={'10px'}
                            title={props.titleBtn} />
                    </div>
                </div>
                <div className={s.searchBlock}>
                    <SearchInput
                        onChange={props.onChangeSearchInput}
                        value={props.valueSearchInput}
                        label={props.labelSearchInput}
                        placeholder={props.placeholder}
                    />
                    <CheckBoxInput
                        label={props.labelCheckBox}
                        checked={props.isChecked}
                        onClick={(value) => props.onClickCheckBox(value)} 
                        searchInputDisplay={props.searchInputDisplay}
                    />
                </div>
            </div>
        </>
    );
}

export default HeaderBlock;
