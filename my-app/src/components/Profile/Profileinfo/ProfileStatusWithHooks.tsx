import React, {ChangeEvent, useState} from "react";


type ProfileStatusWithHooksPropsType = {
    status: string
    updateStatus: (status: string) => void
}


const ProfileStatusWithHooks = (props: ProfileStatusWithHooksPropsType) => {

    const [editMode, SetEditMode] = useState<boolean>(false)
    const [status, SetStatus] = useState<string>(props.status)

    const activateEditMode = () => {
        SetEditMode(true)
    }
    const deActivateEditMode = () => {
        SetEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        SetStatus(e.currentTarget.value)
    }
    //console.log(this.props)
    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{props.status || "no status"}</span>
            </div>}
            {editMode &&
            <div>
                <input autoFocus={true} onBlur={deActivateEditMode}
                       onChange={onStatusChange}
                       value={status}
                />
            </div>
            }

        </div>
    )
}


export default ProfileStatusWithHooks