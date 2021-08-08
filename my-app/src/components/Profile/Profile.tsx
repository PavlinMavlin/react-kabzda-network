import React from "react";
import s from './Profile.module.css'
import {ProfileInfo} from "./Profileinfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../Redux/profile-reducer";
import {ProfileDataFormType} from "./Profileinfo/ProfileDataForm";

type ProfilePropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile:ProfileType) => void
}

export const Profile = (props: ProfilePropsType) => {
    return (
        <div className={s.content}>
            <ProfileInfo savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile}
                         status={props.status} updateStatus={props.updateStatus} saveProfile={props.saveProfile}/>
            <MyPostsContainer/>
        </div>

    )
}