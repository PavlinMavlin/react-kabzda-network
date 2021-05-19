import {ActionTypes} from "./Store";

const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"

export type InitialStateType = typeof initialState
export type PostType = {
    id: number;
    message: string
    likesCount: number
}
let initialState = {
    newPostText: "",
    posts: [
        {id: 1, message: 'Hi, how are you ?', likesCount: 15},
        {id: 2, message: "How is your kamasutra", likesCount: 10},
        {id: 3, message: "haha", likesCount: 10},
        {id: 4, message: "how are you", likesCount: 10},
    ] as Array<PostType>
}


const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.postText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText:""
            }
        case UPDATE_NEW_POST_TEXT:
            return{
                ...state,
                newPostText:action.newText
            }
        default:
            return state
    }

}
export const addPostAC = (postText: string) => {
    return {
        type: ADD_POST,
        postText: postText
    } as const
}
export const updateNewPostTextAC = (newText: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: newText
    } as const
}

export default profileReducer