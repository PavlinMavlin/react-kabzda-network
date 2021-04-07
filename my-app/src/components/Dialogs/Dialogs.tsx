import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './Dialogs.module.css'
import {stringify} from "querystring";


type MessageType = {
    message: string
}

const Message: React.FC<MessageType> = (props) => {
    return <div className={s.message}>{props.message}</div>
}


type DialogItemType = {
    name: string
    id: number
}

const DialogItem: React.FC<DialogItemType> = (props) => {
    let path = "/dialogs/" + props.id

    return <div className={s.dialog + ' ' + s.active}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
}


export const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>

                <DialogItem name={"Dima"} id={1}/>
                <DialogItem name={"Andrey"} id={2}/>
                <DialogItem name={"Sveta"} id={3}/>
                <DialogItem name={"Sasha"} id={4}/>
                <DialogItem name={"Victor"} id={5}/>
                <DialogItem name={"Valera"} id={6}/>


            </div>
            <div className={s.messages}>
                <Message message={"HI"}/>
                <Message message={"How is your kamasutra"}/>
                <Message message={"yo"}/>


            </div>
        </div>
    )
}