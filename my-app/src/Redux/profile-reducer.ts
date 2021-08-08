import {AppActionType, AppThunkType} from "./redux-store";
import {profileAPI, usersAPI} from "../api/api";
import {ProfileDataFormType} from "../components/Profile/Profileinfo/ProfileDataForm";
import {stopSubmit} from "redux-form";

const ADD_POST = "PROFILEPAGE/ADD-POST"
const SET_USERS_PROFILE = "PROFILEPAGE/SET_USERS_PROFILE"
const SET_STATUS = "PROFILEPAGE/SET_STATUS"
const DELETE_POST = "PROFILEPAGE/DELETE_POST"
const SAVE_PHOTO_SUCCESS = "PROFILEPAGE/SAVE_PHOTO_SUCCESS"

export type ProfileActionTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof setUsersProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof deleteAC>

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
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
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
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        case SAVE_PHOTO_SUCCESS:

            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
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
export const deleteAC = (postId: number) => {
    return {
        type: DELETE_POST,
        postId
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
export const savePhotoSuccess = (photos: ProfilePhotosType) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos
    } as const
}


export const getUserProfile = (userId: number): AppThunkType => async (dispatch) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUsersProfile(response.data))
}
export const getStatus = (userId: number): AppThunkType => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatus = (status: string): AppThunkType => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (file: File): AppThunkType => async (dispatch) => {

    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        debugger
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): AppThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0 && userId) {
        dispatch(getUserProfile(userId))
    }else{
        dispatch(stopSubmit("edit-profile", {_error:response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer