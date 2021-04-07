import React from "react";
import s from './Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";

export const Profile = () => {
    return (
        <div className={s.content}>
            <div>
                <img src={'https://img.as-creation.com/s0/031021.jpg'}/>
            </div>

            <div>
                ava+discription
            </div>

            <MyPosts/>


        </div>

    )
}