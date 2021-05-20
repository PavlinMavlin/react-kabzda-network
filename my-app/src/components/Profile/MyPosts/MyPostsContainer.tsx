//import React from "react";
import {addPostAC, PostType, updateNewPostTextAC} from "../../../Redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {RootReduxStateType} from "../../../Redux/redux-store";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    posts: Array<PostType>,
    newPostText: string,
}
type MapDispatchToPropsType = {
    onChangeText: (newText: string) => void
    addPost: (newPostText: string) => void
}
const mapStateToProps = (state: RootReduxStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        onChangeText: (newText: string) => {
            dispatch(updateNewPostTextAC(newText))
        },
        addPost: (newPostText: string) => {
            dispatch(addPostAC(newPostText))
        }
    }
}
export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
//
// export const MyPostsContainer = (props: MyPostsContainerType) => {
//     const profilePage = props.store.getState().profilePage
//     const addPost = () => {
//         props.store.dispatch(addPostAC(profilePage.newPostText))
//     }
//
//     const onChangeText = (newText: string) => {
//         props.store.dispatch(updateNewPostTextAC(newText))
//     }
//
//     return <MyPosts onChangeText={onChangeText}
//                     addPost={addPost}
//                     posts={profilePage.posts}
//                     newPostText={profilePage.newPostText}
//     />
//
// }