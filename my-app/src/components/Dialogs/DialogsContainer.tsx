import React from 'react'
import {DialogType, MessageType, sendMessageAC} from "../../Redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {RootReduxStateType} from "../../Redux/redux-store";
import {connect} from "react-redux";
import {compose, Dispatch} from 'redux';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


type MapStateToPropsType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>,
    isAuth: boolean,
}
type MapDispatchToPropsType = {

    sendMessage: (newMessageBody:string ) => void
}
const mapStateToProps = (state: RootReduxStateType): MapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        isAuth: state.auth.isAuth
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        sendMessage: (newMessageBody:string) => {
            dispatch(sendMessageAC(newMessageBody))
        }
    }
}


 const DialogsContainer = compose<React.ComponentType>(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)
(Dialogs)

export default DialogsContainer

