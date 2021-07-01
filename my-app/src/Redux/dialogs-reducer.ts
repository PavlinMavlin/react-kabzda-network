import {AppActionType} from "./redux-store";

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY"
const SEND_MESSAGE = "SEND-MESSAGE"

export type MessageType = {
    id: number
    message: string
}
export type DialogType = {
    id: number
    name: string
}
export type InitialStateType = typeof initialState
export type DialogsActionTypes = ReturnType<typeof sendMessageAC>


const initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: "Andrey"},
        {id: 3, name: "Sveta"},
        {id: 4, name: "Sasha"},
        {id: 5, name: "Sasha"},
        {id: 6, name: "Victor"},

    ] as Array<DialogType>,
    messages: [
        {id: 1, message: "HI"},
        {id: 2, message: "How is your kamasutra"},
        {id: 3, message: "yo"},
        {id: 4, message: "yo"},
        {id: 5, message: "yo"},
        {id: 6, message: "yo"},
    ] as Array<MessageType>,

}

export const dialogsReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {

        case SEND_MESSAGE:
            let body = action.newMessageBody

            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state
    }

}

export const sendMessageAC = (newMessageBody: string) => {
    return {
        type: SEND_MESSAGE,
        newMessageBody
    } as const
}
export default dialogsReducer