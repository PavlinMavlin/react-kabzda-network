import {AppActionType, AppThunkType} from "./redux-store";
import {authApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "AUTH/SET_USER_DATA"


export type AuthActionType = ReturnType<typeof setAuthUserData>

export type InitialStateAuthReducerType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

let initialState: InitialStateAuthReducerType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
}

export const authReducer = (state = initialState, action: AppActionType): InitialStateAuthReducerType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }

}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        payload: {id, email, login, isAuth}
    } as const
}

export const getAuthUserData = (): AppThunkType => async (dispatch) => {
    let response = await authApi.me();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean): AppThunkType => async (dispatch) => {
    let response = await authApi.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}
export const logout = (): AppThunkType => async (dispatch) => {
    let response = await authApi.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
