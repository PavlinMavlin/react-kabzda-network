import React from "react";
import s from "./ProfileInfo.module.css"
import {ProfileType} from "../../../Redux/profile-reducer";
import ProfileStatus from "./ProfileStatus";

type ProfileInfoPropsType = {
    profile: ProfileType
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {
    console.log(props)
    return (
        <div>
            {/*<div>*/}
            {/*    <img src={'https://img.as-creation.com/s0/031021.jpg'} alt={" "}/>*/}
            {/*</div>*/}

            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}   alt={" "}/>
                <ProfileStatus status={"hello pasha"}/>
            </div>


        </div>

    )
}
//props.profile.photos.large