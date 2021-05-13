import React, {ChangeEvent} from 'react'

import s from './Dialogs.module.css'
import {DialogItem} from "./Dialogitem/DialogItemType";
import {Message, MessageType} from "./Message/Message";
import {DialogType} from "../../Redux/Store";


type DialogsPropsType = {

    newMessageBody: string
    messages: Array<MessageType>
    dialogs: Array<DialogType>
    updateNewMessageBody:(body:string)=>void
    sendMessage:()=>void

}

export const Dialogs = (props: DialogsPropsType) => {

    let dialogsElement = props.dialogs.map(
        (d) => <DialogItem name={d.name} id={d.id}/>
    )

    let messagesElements = props.messages.map(
        (m) => <Message message={m.message}/>
    )

    let newMessageBody = props.newMessageBody

    const onSendMessageClick = () => {
        props.sendMessage()
    }

    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value
        props.updateNewMessageBody(body)

    }


    return <div className={s.dialogs}>
        <div className={s.dialogsItems}>{dialogsElement}</div>
        <div className={s.messages}>
            <div> {messagesElements}</div>
            <div>
                <div><textarea onChange={onNewMessageChange} value={newMessageBody}></textarea></div>
                <div>
                    <button onClick={onSendMessageClick}>Send</button>
                </div>
            </div>
        </div>
    </div>


}