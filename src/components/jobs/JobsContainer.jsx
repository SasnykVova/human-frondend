import React from 'react';
import Jobs from './Jobs';
import { connect } from 'react-redux';
import { newPostTextAC } from '../../toolkitRedux/jobstoolkitReducer';

const mapStateToProps = (state) => {
    return {
        newPostText: state.jobsPage.newPostText,
    }
}

export const JobsContainer = () => {
    return (
        <div>
            <Jobs/>
        </div>
    );
}

export default connect (mapStateToProps, {
    newPostTextAC
})(Jobs);

