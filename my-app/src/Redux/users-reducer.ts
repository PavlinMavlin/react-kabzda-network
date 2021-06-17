import {usersAPI} from "../api/api";
import {AppActionType, AppThunkType} from "./redux-store";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"

export type UsersActionType = ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleIsFollowingProgress>


export type UsersType = {
    id: number;
    name: string
    status: string
    location: LocationType
    followed: boolean
    photos: PhotosUserType
}
type PhotosUserType = {
    small: string | null
    large: string | null
}
type LocationType = {
    city: string
    country: string
}
// export type IdType={
//     id:number
// }
export type InitialStateType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    ifFetching: boolean
    followingInProgress: Array<number>
}
let initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 2,
    ifFetching: true,
    followingInProgress: []
}


const usersReducer = (state = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }

        case  UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }

        case SET_USERS: {
            return {...state, users: action.users}
        }

        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, ifFetching: action.ifFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state, followingInProgress: action.ifFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id != action.userID)
            }
        }

        default:
            return state
    }

}
export const followSuccess = (userID: number) => {
    return {
        type: FOLLOW,
        userID,
    } as const
}
export const unfollowSuccess = (userID: number) => {
    return {
        type: UNFOLLOW,
        userID,
    } as const
}
export const setUsers = (users: Array<UsersType>) => {
    return {
        type: SET_USERS,
        users,
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage,
    } as const
}
export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount,
    } as const
}
export const toggleIsFetching = (ifFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING,
        ifFetching,
    } as const
}
export const toggleIsFollowingProgress = (ifFetching: boolean, userID: number) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        ifFetching, userID,
    } as const
}


export const getUsers = (currentPage: number, pageSize: number): AppThunkType => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))

        usersAPI.getUsers(currentPage, pageSize).then(data => {
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.items))
                dispatch(setTotalUsersCount(data.totalCount))
            }
        )
    }
}
export const follow = (id: number): AppThunkType => {
    return (dispatch) => {
        dispatch(toggleIsFollowingProgress(true, id));

        usersAPI.follow(id).then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followSuccess(id))
                }
                dispatch(toggleIsFollowingProgress(false, id))
            }
        )
    }
}


export const unfollow = (id: number): AppThunkType => {
    return (dispatch) => {
        dispatch(toggleIsFollowingProgress(true, id));

        usersAPI.unfollow(id).then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowSuccess(id))
                }
                dispatch(toggleIsFollowingProgress(false, id))
            }
        )
    }
}
export default usersReducer