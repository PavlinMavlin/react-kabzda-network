import React, {ChangeEvent, useState} from "react";
import s from "./ProfileInfo.module.css"
import {ProfileContactsType, ProfileType} from "../../../Redux/profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/pngtree-vector-user-young-boy-avatar-icon-png-image_4827810.jpg";
import {ProfileDataForm, ProfileDataFormReduxForm, ProfileDataFormType} from "./ProfileDataForm";


export const ProfileInfo = (props: ProfileInfoPropsType) => {

    const [editMode, SetEditMode] = useState<boolean>(false)

    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            props.savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData: ProfileDataFormType) => {
       props.saveProfile(formData).then(()=>{SetEditMode(false)})

    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} alt={" "} className={s.mainPhoto}/>
                {props.isOwner && <input type={"file"} onChange={mainPhotoSelected}/>}
                {editMode
                    ?
                    <ProfileDataFormReduxForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}
                    />
                    : <ProfileData
                        profile={props.profile}
                        isOwner={props.isOwner}
                        goToEditMode={() => {
                            SetEditMode(true)
                        }}
                    />}


                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>


        </div>

    )
}


const ProfileData = (props: ProfileDataPropsType) => {
    return <div>
        {props.isOwner && <div>
            <button onClick={props.goToEditMode}>edit</button>
        </div>}
        <div>
            <b>Full name</b>:{props.profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>:{props.profile.lookingForAJob ? "Yes" : "no"}
        </div>
        {props.profile.lookingForAJob &&
        <div>
            <b>My professional skills</b>:{props.profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>About me</b>:{props.profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>:{Object.keys(props.profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key}
                            contactValue={props.profile.contacts[key as keyof ProfileContactsType]}/>
        })}
        </div>
    </div>
}


export const Contact = (props: ContactPropsType) => {
    return <div className={s.contact}><b>{props.contactTitle}</b>:{props.contactValue}</div>
}
//types
type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
type ProfileInfoPropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => any
}