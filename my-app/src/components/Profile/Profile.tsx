import React from "react";
import s from './Profile.module.css'
import {ProfileInfo} from "./Profileinfo/ProfileInfo";
import {ReduxStoreType} from "../../Redux/redux-store";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

type ProfileProps = {
    store: ReduxStoreType
}

export const Profile = (props: ProfileProps) => {

    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPostsContainer
                store={props.store}
            />
        </div>

    )
}