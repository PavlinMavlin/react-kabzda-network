import React from "react";
import {addPostAC, updateNewPostTextAC} from "../../../Redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {ReduxStoreType} from "../../../Redux/redux-store";


type MyPostsContainerType = {
    store: ReduxStoreType
}


export const MyPostsContainer = (props: MyPostsContainerType) => {

    const profilePage = props.store.getState().profilePage

    const addPost = () => {
        props.store.dispatch(addPostAC(profilePage.newPostText))
    }

    const onChangeText = (newText: string) => {
        props.store.dispatch(updateNewPostTextAC(newText))
    }

    return <MyPosts onChangeText={onChangeText}
                    addPost={addPost}
                    posts={profilePage.posts}
                    newPostText={profilePage.newPostText}
    />

}