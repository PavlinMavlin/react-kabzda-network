import React from 'react'
import {DialogType, MessageType, sendMessageAC, updateNewMessageBodyAC} from "../../Redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {RootReduxStateType} from "../../Redux/redux-store";
import {connect} from "react-redux";
import {Dispatch} from 'redux';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


type MapStateToPropsType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>,
    newMessageBody: string,
    isAuth: boolean,
}
type MapDispatchToPropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
}
const mapStateToProps = (state: RootReduxStateType): MapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageBody: state.dialogsPage.newMessageBody,
        isAuth:state.auth.isAuth
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyAC(body))
        },
        sendMessage: () => {
            dispatch(sendMessageAC())
        }
    }
}
let AuthRedirectComponent=withAuthRedirect(Dialogs)

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

