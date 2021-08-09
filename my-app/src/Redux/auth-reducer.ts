import {AppActionType, AppThunkType} from "./redux-store";
import {authApi, securityApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "AUTH/SET_USER_DATA"
const SET_CAPTCHA = "AUTH/SET_CAPTCHA"


export type AuthActionType = ReturnType<typeof setAuthUserData>

export type InitialStateAuthReducerType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

let initialState: InitialStateAuthReducerType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

export const authReducer = (state = initialState, action: AppActionType): InitialStateAuthReducerType => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA:
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
export const setCaptchaSuccess = (captchaUrl: string) => {
    return {
        type: SET_CAPTCHA,
        payload: {captchaUrl}
    } as const
}

export const getAuthUserData = (): AppThunkType => async (dispatch) => {
    let response = await authApi.me();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean,captcha:string): AppThunkType => async (dispatch) => {
    let response = await authApi.login(email, password, rememberMe,captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    }
   else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptcha())
        }
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
export const getCaptcha = (): AppThunkType => async (dispatch) => {
    let response = await securityApi.getCaptchaUrl()
    dispatch(setCaptchaSuccess(response.data.url))
}
