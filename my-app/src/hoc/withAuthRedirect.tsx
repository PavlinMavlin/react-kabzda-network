import {RootReduxStateType} from "../Redux/redux-store";
import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";
import {connect} from "react-redux";


type MapStateToPropsType = {
    isAuth: boolean
}
let mapsStateToPropsForDirect = (state: RootReduxStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: MapStateToPropsType) => {
        let {isAuth, ...restProps} = props;
        if (!isAuth) return <Redirect to={"/login"}/>
        return <Component   {...restProps as T} />

    }
    let ConnectedRedirectComponent = connect(mapsStateToPropsForDirect)(RedirectComponent)
    return ConnectedRedirectComponent
}