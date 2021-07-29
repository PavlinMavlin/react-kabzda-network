import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer, {ProfileActionTypes} from "./profile-reducer";
import dialogsReducer, {DialogsActionTypes} from "./dialogs-reducer";
import {SideBarActionType, sidebarReducer} from "./sidebar-reducer";
import userReducer, {UsersActionType} from "./users-reducer"
import {AuthActionType, authReducer} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from "redux-form";
import {appReducer, AppReducerActionType} from "./app-reducer";

export const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    userPage: userReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

//let store = createStore(reducers, applyMiddleware(thunkMiddleware))


export type AppActionType =
    UsersActionType
    | DialogsActionTypes
    | ProfileActionTypes
    | AuthActionType
    | SideBarActionType
    | AppReducerActionType

export type RootReduxStateType = ReturnType<typeof reducers>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,
    RootReduxStateType,
    unknown,
    AppActionType>


export default store