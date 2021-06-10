const SET_USER_DATA = "SET_USER_DATA"


type ActionType = ReturnType<typeof setAuthUserData>

export type InitialStateAuthReducerType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth:boolean
}

let initialState: InitialStateAuthReducerType = {
    id: null,
    email: null,
    login: null,
    isAuth:false,
}

export const authReducer = (state = initialState, action: ActionType):InitialStateAuthReducerType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth:true
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

