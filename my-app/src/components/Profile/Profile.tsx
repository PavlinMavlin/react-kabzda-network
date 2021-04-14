import React from "react";
import s from './Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./Profileinfo/ProfileInfo";
import {PostType, ProfilePageType} from "../../Redux/State";

type ProfileProps = {
    posts: Array<PostType>
}

// ]
export const Profile = (props: ProfileProps) => {

    return (
        <div className={s.content}>
            <ProfileInfo/>


            <MyPosts posts={props.posts}

            />


        </div>

    )
}