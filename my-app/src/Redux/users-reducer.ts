const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"

type UsersActionType = ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalCountAC>
    | ReturnType<typeof ToggleIsFetchingAC>


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
export type InitialStateType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    ifFetching: boolean
}
let initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 2,
    ifFetching: false,

}


const usersReducer = (state = initialState, action: UsersActionType): InitialStateType => {
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

        default:
            return state
    }

}
export const followAC = (userID: number) => {
    return {
        type: FOLLOW,
        userID
    } as const
}
export const unfollowAC = (userID: number) => {
    return {
        type: UNFOLLOW,
        userID
    } as const
}
export const setUsersAC = (users: Array<UsersType>) => {
    return {
        type: SET_USERS,
        users
    } as const
}
export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    } as const
}
export const setTotalCountAC = (totalUsersCount: number) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    } as const
}
export const ToggleIsFetchingAC = (ifFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING,
        ifFetching
    } as const
}
export default usersReducer