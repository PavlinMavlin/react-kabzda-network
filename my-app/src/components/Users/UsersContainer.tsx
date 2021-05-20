import React from "react";
import {Users} from "./Users";
import {connect} from "react-redux";
import {RootReduxStateType} from "../../Redux/redux-store";
import {followAC, setUsersAC, unfollowAC, UsersType} from "../../Redux/users-reducer";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    users: Array<UsersType>
}
type MapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UsersType>) => void
}

let mapStateToProps = (state: RootReduxStateType): MapStateToPropsType => {
    return {
        users: state.userPage.users
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        follow: (userID: number) => {
            dispatch(followAC(userID))
        },
        unfollow: (userID: number) => {
            dispatch(unfollowAC(userID))
        },
        setUsers: (users: Array<UsersType>) => {
            dispatch(setUsersAC(users))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Users)