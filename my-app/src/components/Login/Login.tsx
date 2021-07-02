import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input, Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {RootReduxStateType} from "../../Redux/redux-store";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}


export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'email'} placeholder={'email'} validate={[required]} component={Input}/>
            </div>
            <div>
                <Field name={"password"} placeholder={"Password"} type={"password"} validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field name={"rememberMe"} type={"checkbox"} component={Input}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

export const LoginReduxForm = reduxForm<FormDataType>({
    form: "login"
})(LoginForm)

type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}


const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )

}

const mapStateToProps = (state: RootReduxStateType) => ({
    isAuth:state.auth.isAuth
})
export default connect(mapStateToProps, {login})(Login)