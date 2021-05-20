import {ActionTypes} from "./Store";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"

type UsersActionType = ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsersAC>

export type InitialStateType = {
    users: Array<UsersType>
}
export type UsersType = {
    id: number;
    fullName: string
    status: string
    location: LocationType
    followed: boolean
    photoUrl:string
}
type LocationType = {
    city: string
    country: string
}
let initialState: InitialStateType = {
    users:[]
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
            return {...state,users:[...state.users,...action.users]}
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
export default usersReducer