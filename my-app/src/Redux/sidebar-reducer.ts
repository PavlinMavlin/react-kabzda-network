import {ActionTypes, SidebarType} from "./Store";

let initialState: SidebarType = {}
export const sidebarReducer = (state: SidebarType = initialState, action: ActionTypes): SidebarType => {
    return state
}
