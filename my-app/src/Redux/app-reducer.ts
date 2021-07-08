import {AppActionType, AppThunkType} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"


export type AppReducerActionType = ReturnType<typeof initialazedSuccess>

export type InitialStateAppReducerType = {
    initialized: boolean
}

let initialState: InitialStateAppReducerType = {
    initialized: false
}

export const appReducer = (state = initialState, action: AppActionType): InitialStateAppReducerType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }

}

export const initialazedSuccess = () => ({type: INITIALIZED_SUCCESS})


export const initializeApp = (): AppThunkType => {
    return (dispatch) => {
        let promise = dispatch(getAuthUserData())
        Promise.all([promise]).then(() => {
            dispatch(initialazedSuccess())
        })
    }
}
//Promise.all([promise]