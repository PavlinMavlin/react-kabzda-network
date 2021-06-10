import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";
import userReducer from "./users-reducer"
import {authReducer} from "./auth-reducer";

export const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    userPage: userReducer,
    auth: authReducer,
})

export type RootReduxStateType = ReturnType<typeof reducers>

let store = createStore(reducers)


export default store