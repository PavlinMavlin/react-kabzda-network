import React from "react";
import {Header} from "./Header";
import {getAuthUserData, InitialStateAuthReducerType, logout, setAuthUserData} from "../../Redux/auth-reducer";
import {connect} from "react-redux";
import {RootReduxStateType} from "../../Redux/redux-store";

type HeaderContainerPropsType = {

    isAuth: boolean
    login: string | null
    getAuthUserTC:()=>void
    logout:()=>void
}
type  MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}


const mapStateToProps = (state: RootReduxStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,

})

class HeaderContainer extends React.Component<HeaderContainerPropsType, InitialStateAuthReducerType> {

    // componentDidMount() {
    //     this.props.getAuthUserTC()
    // }


    render() {
        return (
            <Header
                isAuth={this.props.isAuth}
                login={this.props.login}
                logout={this.props.logout}
            />
        )
    }
}

export default connect(mapStateToProps, {getAuthUserTC: getAuthUserData,logout})(HeaderContainer)