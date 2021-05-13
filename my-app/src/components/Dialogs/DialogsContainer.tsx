import React, {ChangeEvent} from 'react'

import s from './Dialogs.module.css'
import {DialogItem} from "./Dialogitem/DialogItemType";
import {Message, MessageType} from "./Message/Message";
import {ActionTypes, DialogType} from "../../Redux/Store";
import {sendMessageAC, updateNewMessageBodyAC} from "../../Redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {ReduxStoreType} from "../../Redux/redux-store";


type DialogsContainersPropsType = {
    store: ReduxStoreType
}

export const DialogsContainer = (props: DialogsContainersPropsType) => {

    const dialogsPage = props.store.getState().dialogsPage

    const onSendMessageClick = () => {
        props.store.dispatch(sendMessageAC())
    }

    const onNewMessageChange = (body: string) => {

        props.store.dispatch(updateNewMessageBodyAC(body))
    }


    return < Dialogs
        newMessageBody={dialogsPage.newMessageBody}
        messages={dialogsPage.messages}
        dialogs={dialogsPage.dialogs}
        updateNewMessageBody={onNewMessageChange}
        sendMessage={onSendMessageClick}

    />


}