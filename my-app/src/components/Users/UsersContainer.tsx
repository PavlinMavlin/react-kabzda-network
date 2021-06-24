import React from "react";
import {connect} from "react-redux";
import {RootReduxStateType} from "../../Redux/redux-store";
import {
    followSuccess,
    getUsers,
    InitialStateType,
    setCurrentPage,
    unfollowSuccess,
    UsersType
} from "../../Redux/users-reducer";
import {Users} from "./Users";
import {Preloader} from "../common/prelouder/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import { compose } from "redux";


type MapStateToPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    ifFetching: boolean
    followingInProgress: Array<number>
}
type UserContainerPropsType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    ifFetching: boolean
    users: Array<UsersType>
    setCurrentPage: (currentPage: number) => void
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    followingInProgress: Array<number>
    getUsers: (currentPage: number, pageSize: number) => void
}

let mapStateToProps = (state: RootReduxStateType): MapStateToPropsType => {
    return {
        users: state.userPage.users,
        pageSize: state.userPage.pageSize,
        totalUsersCount: state.userPage.totalUsersCount,
        currentPage: state.userPage.currentPage,
        ifFetching: state.userPage.ifFetching,
        followingInProgress: state.userPage.followingInProgress,
    }
}


class UserContainer extends React.Component<UserContainerPropsType, InitialStateType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (currentPage: number) => {
        this.props.getUsers(currentPage, this.props.pageSize)
        this.props.setCurrentPage(currentPage)
    }

    render() {


        return <>
            {this.props.ifFetching ? <Preloader/>
                : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow: followSuccess, unfollow: unfollowSuccess,
        setCurrentPage, getUsers

    }),withAuthRedirect
)(UserContainer)

// export const withAuthRedirect(connect(mapStateToProps, {
//     follow: followSuccess, unfollow: unfollowSuccess,
//     setCurrentPage, getUsers
//
// })(UserContainer))