import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import { addPostAC, updateNewPostTextAC} from "../../../Redux/profile-reducer";
import {ActionTypes, PostType} from "../../../Redux/State";


type MyPostsType = {
    dispatch: (action: ActionTypes) => void
    posts: Array<PostType>
    newPostText: string
}


export const MyPosts = (props: MyPostsType) => {

    let postsElements = props.posts.map(
        (p) => <Post message={p.message} likesCount={p.likesCount}/>
    )
    const addPost = () => {
        props.dispatch(addPostAC(props.newPostText))
    }
    const onClickChangeTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(updateNewPostTextAC( e.currentTarget.value))
    }


    return (<div>
        <h3>My post</h3>
        <div>
            <div>
                <textarea onChange={onClickChangeTextHandler} value={props.newPostText}></textarea>
            </div>
            <div>
                <button onClick={addPost}>Add post</button>
            </div>
        </div>

        <div className={s.posts}>
            {postsElements}


        </div>
    </div>)

}