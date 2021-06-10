import React from "react";
import {connect} from "react-redux";
import {RootReduxStateType} from "../../Redux/redux-store";
import {
    follow,
    InitialStateType,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    toggleIsFollowingProgress,
    unfollow,
    UsersType
} from "../../Redux/users-reducer";
import {Users} from "./Users";
import {Preloader} from "../common/prelouder/Preloader";
import {usersAPI} from "../../api/api";


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
    setTotalUsersCount: (totalUsersCount: number) => void
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UsersType>) => void
    toggleIsFetching: (ifFetching: boolean) => void
    toggleIsFollowingProgress:(ifFetching: boolean,userID:number)=>void
    followingInProgress: Array<number>

}

let mapStateToProps = (state: RootReduxStateType): MapStateToPropsType => {
    return {
        users: state.userPage.users,
        pageSize: state.userPage.pageSize,
        totalUsersCount: state.userPage.totalUsersCount,
        currentPage: state.userPage.currentPage,
        ifFetching: state.userPage.ifFetching,
        followingInProgress:state.userPage.followingInProgress,
    }
}


class UserContainer extends React.Component<UserContainerPropsType, InitialStateType> {
    componentDidMount() {
        this.props.toggleIsFetching(true)

        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            }
        )
    }

    onPageChanged = (currentPage: number) => {

        this.props.setCurrentPage(currentPage)
        this.props.toggleIsFetching(true)

        usersAPI.getUsers(currentPage, this.props.pageSize).then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            }
        )

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
                   toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}


export default connect(mapStateToProps, {
    follow, unfollow, setUsers,
    setCurrentPage, setTotalUsersCount, toggleIsFetching,toggleIsFollowingProgress

})(UserContainer)