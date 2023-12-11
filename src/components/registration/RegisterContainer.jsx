import React from 'react';
import { connect } from 'react-redux';
import Register from './Register';
import { newNameTextAC, newSurnameTextAC, newEmailTextAC ,newPasswordTextAC, getRegister } from '../../toolkitRedux/registertoolkitReducer';

const mapStateToProps = (state) => {
    return {
        name: state.registerPage.name,
        surname: state.registerPage.surname,
        email: state.registerPage.email,
        password: state.registerPage.password,
    }
}

export const RegisterContainer = (props) => {
    return (
        <div>
            <Register props={props}/>
        </div>
    );
}

export default connect ( mapStateToProps, { 
    newNameTextAC, newSurnameTextAC, newEmailTextAC ,newPasswordTextAC, getRegister, })(Register);
