import React from "react";
import {addPostAC, PostType} from "../../../Redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {RootReduxStateType} from "../../../Redux/redux-store";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    posts: Array<PostType>,
}
type MapDispatchToPropsType = {
    addPost: (postText: string) => void
}
const mapStateToProps = (state: RootReduxStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: (postText: string) => {
            dispatch(addPostAC(postText))
        }
    }
}
export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
