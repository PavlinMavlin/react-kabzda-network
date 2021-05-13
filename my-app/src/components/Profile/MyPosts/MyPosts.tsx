import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {PostType} from "../../../Redux/Store";


type MyPostsType = {
    onChangeText: (newText: string) => void
    posts: Array<PostType>
    newPostText: string
    addPost: (postText: string) => void
}

export const MyPosts = (props: MyPostsType) => {

    let postsElements = props.posts.map(
        (p) => <Post message={p.message} likesCount={p.likesCount}/>
    )
    let newAddPostText = props.newPostText

    const addPost = () => {
        props.addPost(props.newPostText)
    }
    const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onChangeText(e.currentTarget.value)
    }


    return (<div>
        <h3>My post</h3>
        <div>
            <div>
                <textarea onChange={onChangeText} value={newAddPostText}></textarea>
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