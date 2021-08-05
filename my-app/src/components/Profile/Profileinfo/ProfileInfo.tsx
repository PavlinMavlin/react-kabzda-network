import React, {ChangeEvent} from "react";
import s from "./ProfileInfo.module.css"
import {ProfileType} from "../../../Redux/profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/pngtree-vector-user-young-boy-avatar-icon-png-image_4827810.jpg";

type ProfileInfoPropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file:  File) => void
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {

    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} alt={" "} className={s.mainPhoto}/>
                {props.isOwner && <input type={"file"} onChange={mainPhotoSelected}/>}

                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>


        </div>

    )
}
//props.profile.photos.large