import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {ActionTypes, PostType} from "../../../Redux/State";


type MyPostsType = {
    dispatch: (action: ActionTypes) => void
    posts: Array<PostType>
    newPostText: string
    // changeNewText:(newText:string)=>void
    // addPost: (postText: string) => void
}


export const MyPosts = (props: MyPostsType) => {


    let postsElements = props.posts.map(
        (p) => <Post message={p.message} likesCount={p.likesCount}/>
    )

    // let newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
        props.dispatch({type: "ADD-POST", postText: props.newPostText})
    }


    const onClickChangeTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch({type: "CHANGE-NEW-TEXT", newText: e.currentTarget.value})
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