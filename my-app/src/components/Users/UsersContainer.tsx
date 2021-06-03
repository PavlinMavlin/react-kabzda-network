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
    unfollow,
    UsersType
} from "../../Redux/users-reducer";
import axios from "axios";
import {Users} from "./Users";
import {Preloader} from "../common/prelouder/Preloader";

type MapStateToPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    ifFetching: boolean
}
// type MapDispatchToPropsType = {
//     follow: (userID: number) => void
//     unfollow: (userID: number) => void
//     setUsers: (users: Array<UsersType>) => void
//     setCurrentPage: (currentPage: number) => void
//     setTotalUsersCount: (totalUsersCount: number) => void
//     toggleIsFetching: (ifFetching: boolean) => void
// }
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
}

let mapStateToProps = (state: RootReduxStateType): MapStateToPropsType => {
    return {
        users: state.userPage.users,
        pageSize: state.userPage.pageSize,
        totalUsersCount: state.userPage.totalUsersCount,
        currentPage: state.userPage.currentPage,
        ifFetching: state.userPage.ifFetching
    }
}
// let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
//     return {
//         follow: (userID: number) => {
//             dispatch(followAC(userID))
//         },
//         unfollow: (userID: number) => {
//             dispatch(unfollowAC(userID))
//         },
//         setUsers: (users: Array<UsersType>) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (currentPage: number) => {
//             dispatch(setCurrentPageAC(currentPage))
//         },
//         setTotalUsersCount: (totalUsersCount: number) => {
//             dispatch(setTotalUsersCountAC(totalUsersCount))
//         },
//         toggleIsFetching: (ifFetching: boolean) => {
//             dispatch(ToggleIsFetchingAC(ifFetching))
//         }
//
//     }
// }


class UserContainer extends React.Component<UserContainerPropsType, InitialStateType> {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            }
        )
    }

    onPageChanged = (currentPage: number) => {

        this.props.setCurrentPage(currentPage)
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`).then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
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

            />
        </>
    }
}


export default connect(mapStateToProps, {follow,unfollow,setUsers,
    setCurrentPage,setTotalUsersCount,toggleIsFetching

})(UserContainer)