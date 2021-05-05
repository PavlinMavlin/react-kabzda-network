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
    addPost: (postText: string) => void
    changeNewText: (newText: string) => void
    subscribe: (callback: () => void) => void
    getState: () => RootStateType
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
    addPost(postText: string) {
        const newPost: PostType = {
            id: new Date().getTime(),
            message: postText,
            likesCount: 0
        }
        this._state.profilePage.posts.push(newPost)
        this._onChange()
    },
    changeNewText(newText: string) {
        this._state.profilePage.newPostText = newText
        this._onChange()
    },
    subscribe(callback: () => void) {
        this._onChange = callback
    },
    getState() {
        return this._state
    }
}

export default store

