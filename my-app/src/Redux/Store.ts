import profileReducer, {addPostAC, updateNewPostTextAC} from "./profile-reducer";
import dialogsReducer, {sendMessageAC, updateNewMessageBodyAC} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";


//TYPES
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType

}
export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}
export type DialogsPageType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
    newMessageBody: string
}
 type PostType = {
    id: number;
    message: string
    likesCount: number
}
type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}
export type SidebarType = {}
export type StoreType = {
    _state: RootStateType
    _callSubscriber: () => void
    subscribe: (callback: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionTypes) => void
}
export type ActionTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof updateNewMessageBodyAC>
    | ReturnType<typeof sendMessageAC>

//STATE
const store: StoreType = {
    _state: {
        profilePage: {
            newPostText: "",
            posts: [
                {id: 1, message: 'Hi, how are you ?', likesCount: 15},
                {id: 2, message: "How is your kamasutra", likesCount: 10},
                {id: 3, message: "haha", likesCount: 10},
                {id: 4, message: "how are you", likesCount: 10},
            ]
        },

        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: "Andrey"},
                {id: 3, name: "Sveta"},
                {id: 4, name: "Sasha"},
                {id: 5, name: "Sasha"},
                {id: 6, name: "Victor"},

            ],
            messages: [
                {id: 1, message: "HI"},
                {id: 2, message: "How is your kamasutra"},
                {id: 3, message: "yo"},
                {id: 4, message: "yo"},
                {id: 5, message: "yo"},
                {id: 6, message: "yo"},
            ],
            newMessageBody: "",
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log("state change")
    },
    subscribe(callback: () => void) {
        this._callSubscriber = callback
    },
    getState() {
        return this._state
    },
    dispatch(action: ActionTypes) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._callSubscriber()
    }
}
export default store
// https://www.freecodecamp.org/learn/

