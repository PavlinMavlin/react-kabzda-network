const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const SET_USERS_PROFILE = "SET_USERS_PROFILE"


type ActionTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof setUsersProfile>

export type ProfileType = {
    aboutMe: string
    contacts: ProfileContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: ProfilePhotosType
}
export type ProfileContactsType = {
    facebook: string|null
    website: null | string
    vk: string|null
    twitter: string|null
    instagram: string|null
    youtube: null | string
    github: string|null
    mainLink: null | string
}

export type ProfilePhotosType = {
    small: string
    large: string
}

export type InitialStateType = {
    newPostText: string
    posts: Array<PostType>
    profile: ProfileType | null

}
export type PostType = {
    id: number;
    message: string
    likesCount: number
}
let initialState: InitialStateType = {
    newPostText: "",
    posts: [
        {id: 1, message: 'Hi, how are you ?', likesCount: 15},
        {id: 2, message: "How is your kamasutra", likesCount: 10},
        {id: 3, message: "haha", likesCount: 10},
        {id: 4, message: "how are you", likesCount: 10},
    ],
    profile: null
}


const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
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
                newPostText: ""
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        case SET_USERS_PROFILE:
            return {
                ...state,
                profile: action.profile
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
export const setUsersProfile = (profile: ProfileType) => {
    return {
        type: SET_USERS_PROFILE,
        profile
    } as const
}

export default profileReducer