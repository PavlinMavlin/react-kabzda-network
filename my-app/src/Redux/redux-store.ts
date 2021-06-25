import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {ProfileActionTypes} from "./profile-reducer";
import dialogsReducer, {DialogsActionTypes} from "./dialogs-reducer";
import {SideBarActionType, sidebarReducer} from "./sidebar-reducer";
import userReducer, {UsersActionType} from "./users-reducer"
import {AuthActionType, authReducer} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from "redux-form";

export const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    userPage: userReducer,
    auth: authReducer,
    form: formReducer,
})

export type RootReduxStateType = ReturnType<typeof reducers>

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

export type AppActionType =
    UsersActionType
    | DialogsActionTypes
    | ProfileActionTypes
    | AuthActionType
    | SideBarActionType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,
    RootReduxStateType,
    unknown,
    AppActionType>

export default store