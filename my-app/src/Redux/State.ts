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
}
export type PostType = {
    id: number;
    message: string
    likesCount: number
}
export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
export type SidebarType = {}
export type StoreType = {
    _state: RootStateType
    _onChange: () => void
    subscribe: (callback: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionTypes) => void
}



export type ActionTypes =  ReturnType<typeof addPostAC> | ReturnType<typeof changeNewTextAC>

export const addPostAC = (postText: string) => {
    return {
        type: "ADD-POST",
        postText: postText
    } as const
}
export const changeNewTextAC = (newText: string) => {
    return {
        type: "CHANGE-NEW-TEXT",
        newText: newText
    } as const
}

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


            ]
        },
        sidebar: {}
    },
    _onChange() {
        console.log("state change")
    },
    subscribe(callback: () => void) {
        this._onChange = callback
    },
    getState() {
        return this._state
    },
    dispatch(action) {
        if (action.type === "ADD-POST") {
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.postText,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newPost)
            this._onChange()
        } else if (action.type === "CHANGE-NEW-TEXT") {
            this._state.profilePage.newPostText = action.newText
            this._onChange()
        }
    }
}


export default store

