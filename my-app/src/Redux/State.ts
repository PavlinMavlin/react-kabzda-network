import {rerenderEntireTree} from "../render";


export type RootStateType={
    profilePage:ProfilePageType
    dialogsPage:DialogsPageType
    sidebar:SidebarType

}
export type ProfilePageType={
    posts:Array<PostType>
     newPostText:string
}
export type DialogsPageType={
    messages:Array<MessageType>
    dialogs:Array<DialogType>
}
export type PostType={
    id:number;
    message:string
    likesCount:number
}
export type DialogType={
    id:number
    name:string
}
export type MessageType={
    id:number
    message:string
}

export type SidebarType={}


export let state:RootStateType = {
    profilePage: {
        newPostText:"",
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
    sidebar:{}
}

export const addPost=(postText:string)=>{
const newPost:PostType={
    id: new Date().getTime(),
    message:postText,
    likesCount:0
}
state.profilePage.posts.push(newPost)

    rerenderEntireTree(state)
}
export const changeNewText=(newText:string)=>{
    state.profilePage.newPostText=newText
    rerenderEntireTree(state)
}

export default state

