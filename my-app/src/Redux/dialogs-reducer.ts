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
export type InitialStateType=typeof initialState
type ActionTypes =
    | ReturnType<typeof updateNewMessageBodyAC>
    | ReturnType<typeof sendMessageAC>


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
    newMessageBody: "",
}

export const dialogsReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            // state.newMessageBody = action.body
            return {
                ...state,
                newMessageBody:action.body
            }
        case SEND_MESSAGE:
            let body = state.newMessageBody
            // state.newMessageBody = ""
            // state.messages.push({id: 6, message: body})
            return {
                ...state,
                newMessageBody:"",
                messages:[...state.messages,{id: 6, message: body}]
            }
        default:
            return state
    }

}
export const updateNewMessageBodyAC = (body: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        body: body
    } as const
}
export const sendMessageAC = () => {
    return {
        type: SEND_MESSAGE,

    } as const
}
export default dialogsReducer