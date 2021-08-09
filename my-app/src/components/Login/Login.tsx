import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {RootReduxStateType} from "../../Redux/redux-store";
import styles from '../common/FormsControls/FormsControls.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormPropsTyp = {
    captchaUrl: string | null
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormPropsTyp> & LoginFormPropsTyp> = (props) => {
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
            {props.captchaUrl && <div><img src={props.captchaUrl} alt={" "}/></div>}
            {props.captchaUrl && <Field name={"captcha"} placeholder={"Symbols from image"} validate={[required]}
                                        component={Input}/>}
            {props.error && <div className={styles.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

export const LoginReduxForm = reduxForm<FormDataType, LoginFormPropsTyp>({
    form: "login"
})(LoginForm)

type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    isAuth: boolean
    captchaUrl: string | null
}


const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )

}
type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
const mapStateToProps = (state: RootReduxStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps, {login})(Login)