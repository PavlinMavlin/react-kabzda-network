import {ActionTypes, PostType, ProfilePageType} from "./Store";

const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"



let initialState: ProfilePageType = {
    newPostText: "",
    posts: [
        {id: 1, message: 'Hi, how are you ?', likesCount: 15},
        {id: 2, message: "How is your kamasutra", likesCount: 10},
        {id: 3, message: "haha", likesCount: 10},
        {id: 4, message: "how are you", likesCount: 10},
    ]
}


const profileReducer = (state: ProfilePageType = initialState, action: ActionTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.postText,
                likesCount: 0
            }
            state.posts.push(newPost)
            state.newPostText = ""
            return state
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText
            return state
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