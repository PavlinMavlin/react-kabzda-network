import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {PostType} from "../../../Redux/State";


type MyPostsType = {

    posts: Array<PostType>
}


export const MyPosts = (props: MyPostsType) => {


    let postsElements = props.posts.map(
        (p) => <Post message={p.message} likesCount={p.likesCount}/>
    )
    return (

        <div className={s.postsBlock}>
            <h3>My post</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>

            <div className={s.posts}>
                {postsElements}


            </div>
        </div>)

}