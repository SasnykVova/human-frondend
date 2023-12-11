import React from "react";
import { connect } from "react-redux";
import { isAuthAC } from "../../toolkitRedux/authtoolkitReducer";
import Header from "./Header";

const mapStateToProps = (state) => {
    return
}

export const HeaderContainer = () => {
    return (
        <div>
            <Header/>
        </div>
    )
}

export default connect (mapStateToProps, {
    isAuthAC
})(Header);