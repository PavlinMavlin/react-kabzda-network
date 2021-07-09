import {RootReduxStateType} from "./redux-store";
import {createSelector} from "reselect";

export const getUsersSelector = (state: RootReduxStateType) => {
    return state.userPage.users
}
export const getUsersSuperSelector = createSelector(getUsersSelector, (users) => {
    return users.filter(u=>true)
})
export const getPageSizeSelector = (state: RootReduxStateType) => {
    return state.userPage.pageSize
}
export const getTotalUsersCountSelector = (state: RootReduxStateType) => {
    return state.userPage.totalUsersCount
}
export const getCurrentPageSelector = (state: RootReduxStateType) => {
    return state.userPage.currentPage
}
export const getIfFetchingSelector = (state: RootReduxStateType) => {
    return state.userPage.ifFetching
}
export const getFollowingInProgressSelector = (state: RootReduxStateType) => {
    return state.userPage.followingInProgress
}