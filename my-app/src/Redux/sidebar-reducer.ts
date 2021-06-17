import {AppActionType} from "./redux-store";

type SidebarType = {}
let initialState: SidebarType = {}
 export type SideBarActionType= any


export const sidebarReducer = (state: SidebarType = initialState, action: AppActionType): SidebarType => {
    return state
}
