import React from 'react'

import s from './Dialogs.module.css'
import {DialogItem} from "./Dialogitem/DialogItemType";
import {Message, MessageType} from "./Message/Message";
import {DialogsPageType, DialogType} from "../../Redux/State";

type DialogsPropsType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
}

export const Dialogs = (props: DialogsPropsType) => {


    let dialogsElement = props.dialogs.map(
        (d) => <DialogItem name={d.name} id={d.id}/>
    )

    let messagesElements = props.messages.map(
        (m) => <Message message={m.message}/>
    )
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElement}


            </div>
            <div className={s.messages}>

                {messagesElements}


            </div>
        </div>
    )
}