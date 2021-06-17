import {AppActionType, AppThunkType} from "./redux-store";
import {authApi} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA"


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
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }

}

export const setAuthUserData = (id: number, email: string, login: string) => {
    return {
        type: SET_USER_DATA,
        data: {id, email, login}
    } as const
}

export const getAuthUserTC = (): AppThunkType => {
    return (dispatch) => {
        authApi.me().then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                   dispatch(setAuthUserData(id, email, login))
                }
            }
        )
    }
}
