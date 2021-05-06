import React from "react";
import s from './Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./Profileinfo/ProfileInfo";
import {ActionTypes, PostType, ProfilePageType} from "../../Redux/State";

type ProfileProps = {
    posts: Array<PostType>
    // addPost:(postText: string)=>void
    newPostText: string
    // changeNewText:(newText:string)=>void
    dispatch: (action: ActionTypes) => void
}

// ]
export const Profile = (props: ProfileProps) => {

    return (
        <div className={s.content}>
            <ProfileInfo/>


            <MyPosts posts={props.posts}
                // addPost={props.addPost}
                     newPostText={props.newPostText}
                // changeNewText={props.changeNewText}
                     dispatch={props.dispatch}
            />


        </div>

    )
}