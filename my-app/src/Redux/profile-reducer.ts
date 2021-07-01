import {AppActionType, AppThunkType} from "./redux-store";
import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = "ADD-POST"
const SET_USERS_PROFILE = "SET_USERS_PROFILE"
const SET_STATUS = "SET_STATUS"


export type ProfileActionTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof setUsersProfile>
    | ReturnType<typeof setStatus>

export type ProfileType = {
    aboutMe: string
    contacts: ProfileContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: ProfilePhotosType
}
export type ProfileContactsType = {
    facebook: string | null
    website: null | string
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: null | string
    github: string | null
    mainLink: null | string
}

export type ProfilePhotosType = {
    small: string
    large: string
}

export type InitialStateType = {
    posts: Array<PostType>
    profile: ProfileType | null
    status: string
}
export type PostType = {
    id: number;
    message: string
    likesCount: number
}
let initialState: InitialStateType = {
    posts: [
        {id: 1, message: 'Hi, how are you ?', likesCount: 15},
        {id: 2, message: "How is your kamasutra", likesCount: 10},
        {id: 3, message: "haha", likesCount: 10},
        {id: 4, message: "how are you", likesCount: 10},
    ],
    profile: null,
    status: "",
}


const profileReducer = (state = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.postText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],

            }

        case SET_USERS_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }


        default:
            return state
    }

}
export const addPostAC = (postText: string) => {
    return {
        type: ADD_POST,
        postText: postText
    } as const
}

export const setUsersProfile = (profile: ProfileType) => {
    return {
        type: SET_USERS_PROFILE,
        profile
    } as const
}

export const setStatus = (status: string) => {
    return {
        type: SET_STATUS,
        status
    } as const
}


export const getUserProfile = (userId: string): AppThunkType => {
    return (dispatch) => {
        usersAPI.getProfile(userId).then(response => {
                dispatch(setUsersProfile(response.data))
            }
        )
    }
}
export const getStatus = (userId: string): AppThunkType => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then(response => {
                dispatch(setStatus(response.data))
            }
        )
    }
}

export const updateStatus = (status: string): AppThunkType => {
    return (dispatch) => {
        profileAPI.updateStatus(status).then(response => {
                if (response.data.resultCode === 0) {

                    dispatch(setStatus(status))
                }
            }
        )
    }
}
export default profileReducer