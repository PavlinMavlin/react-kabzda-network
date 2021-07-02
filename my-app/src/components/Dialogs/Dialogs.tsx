import React, {ChangeEvent} from 'react'

import s from './Dialogs.module.css'
import {DialogItem} from "./Dialogitem/DialogItemType";
import {Message, MessageType} from "./Message/Message";
import {DialogType} from "../../Redux/dialogs-reducer";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {AddMessageFormRedux, FormDataType} from "./AddMessageForm/AddMessageForm";


type DialogsPropsType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
    sendMessage: (newMessageBody:string) => void
}

export const Dialogs = (props: DialogsPropsType) => {

    let dialogsElement = props.dialogs.map(
        (d) => <DialogItem key={d.id} name={d.name} id={d.id}/>
    )

    let messagesElements = props.messages.map(
        (m) => <Message message={m.message}/>
    )

    const addNewMessage = (values:FormDataType) => {
        props.sendMessage(values.newMessageBody)
    }


    return <div className={s.dialogs}>
        <div className={s.dialogsItems}>{dialogsElement}</div>
        <div className={s.messages}>
            <div> {messagesElements}</div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    </div>
}

