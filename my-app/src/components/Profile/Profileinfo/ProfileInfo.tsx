import React from "react";
import s from "./ProfileInfo.module.css"
import {ProfileType} from "../../../Redux/profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

type ProfileInfoPropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {

    return (
        <div>
            {/*<div>*/}
            {/*    <img src={'https://img.as-creation.com/s0/031021.jpg'} alt={" "}/>*/}
            {/*</div>*/}

            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large} alt={" "}/>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>


        </div>

    )
}
//props.profile.photos.large