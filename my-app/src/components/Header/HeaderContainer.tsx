import React from "react";
import {Header} from "./Header";
import {InitialStateAuthReducerType, setAuthUserData} from "../../Redux/auth-reducer";
import axios from "axios";
import {connect} from "react-redux";
import {RootReduxStateType} from "../../Redux/redux-store";

type HeaderContainerPropsType = {
    setAuthUserData: (id: number, email: string, login: string) => void
    isAuth: boolean
    login: string | null
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

        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        }).then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    this.props.setAuthUserData(id, email, login)
                }
            }
        )
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


export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)