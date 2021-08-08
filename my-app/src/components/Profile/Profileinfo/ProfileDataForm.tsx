import React from "react";
import {ProfileContactsType, ProfilePhotosType, ProfileType} from "../../../Redux/profile-reducer";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../../utils/validators/validators";
import {Contact} from "./ProfileInfo";
import s from "./ProfileInfo.module.css"
import styles from "../../common/FormsControls/FormsControls.module.css";

export type ProfileDataFormType = {
    aboutMe: string
    contacts: ProfileContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: ProfilePhotosType

}
export type ProfilePropsType = { profile: ProfileType }

export const ProfileDataForm: React.FC<InjectedFormProps<ProfileDataFormType, ProfilePropsType> & ProfilePropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <button>save
            </button>
        </div>
        {props.error && <div className={styles.formSummaryError}>
            {props.error}
        </div>}

        <div>
            <b>Full name</b>:<Field name={"fullName"} placeholder={"Full name"} validate={[required]}
                                    component={Input}/>
        </div>
        <div>
            <b>Looking for a job</b> <Field name={"lookingForAJob"} component={Input}
                                            type="checkbox"/>
        </div>

        <div>
            <b>My professional skills</b>:<Field name={"lookingForAJobDescription"}
                                                 placeholder={"My professional skills"} validate={[required]}
                                                 component={Textarea}/>
        </div>

        <div>
            <b>About me</b>:<Field name={"aboutMe"} placeholder={"About me"} validate={[required]}
                                   component={Textarea}/>
        </div>
        <div>
            <b>Contacts</b>:{Object.keys(props.profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <b>{key}:{<Field  key={key}  name={"contacts." + key} placeholder={key}
                                 component={Input}/>}</b>
            </div>
        })}
        </div>
    </form>
}

export const ProfileDataFormReduxForm = reduxForm<ProfileDataFormType, ProfilePropsType>({
    form: "edit-profile"
})(ProfileDataForm)
