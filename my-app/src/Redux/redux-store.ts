import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";
import userReducer  from "./users-reducer"

export const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    userPage:userReducer
})

export type RootReduxStateType = ReturnType<typeof reducers>

let store = createStore(reducers)

// export type ReduxStoreType = typeof store

export default store