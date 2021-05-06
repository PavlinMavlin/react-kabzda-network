import React from "react";
import s from './Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./Profileinfo/ProfileInfo";
import {ActionTypes, PostType} from "../../Redux/State";

type ProfileProps = {
    posts: Array<PostType>
    newPostText: string
    dispatch: (action: ActionTypes) => void
}

// ]
export const Profile = (props: ProfileProps) => {

    return (
        <div className={s.content}>
            <ProfileInfo/>


            <MyPosts posts={props.posts}
                     newPostText={props.newPostText}
                     dispatch={props.dispatch}
            />
        </div>

    )
}