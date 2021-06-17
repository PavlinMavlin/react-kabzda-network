import React from "react";
import {Header} from "./Header";
import {InitialStateAuthReducerType, setAuthUserData, getAuthUserTC} from "../../Redux/auth-reducer";
import {connect} from "react-redux";
import {RootReduxStateType} from "../../Redux/redux-store";
import {authApi} from "../../api/api";

type HeaderContainerPropsType = {

    isAuth: boolean
    login: string | null
    getAuthUserTC:()=>void
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

    componentDidMount() {
        this.props.getAuthUserTC()
    }


    render() {
        return (
            <Header
                isAuth={this.props.isAuth}
                login={this.props.login}
            />
        )
    }
}
// axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
//     withCredentials: true
// })
//setAuthUserData: (id: number, email: string, login: string) => void
export default connect(mapStateToProps, {setAuthUserData,getAuthUserTC})(HeaderContainer)