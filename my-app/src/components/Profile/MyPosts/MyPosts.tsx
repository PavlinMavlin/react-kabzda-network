import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {PostType} from "../../../Redux/State";


type MyPostsType = {

    posts: Array<PostType>
    addPost:(postText: string)=>void
}


export const MyPosts = (props: MyPostsType) => {


    let postsElements = props.posts.map(
        (p) => <Post message={p.message} likesCount={p.likesCount}/>
    )

    let newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
        if (newPostElement.current) {
           props.addPost(newPostElement.current.value)
            newPostElement.current.value=""// занулили строку
        }

    }

    return (

        <div className={s.postsBlock}>
            <h3>My post</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
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