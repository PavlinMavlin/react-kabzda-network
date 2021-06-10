import React from "react";
import {NavLink} from "react-router-dom";
import s from './Header.module.css';

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
}

export const Header = (props: HeaderPropsType) => {

    return (
        <header className={s.header}>
            <img src={"https://seeklogo.com/images/C/company-name-logo-09881CAD1A-seeklogo.com.png"} alt={" "}/>

            <div className={s.loginBlock}>
                {props.isAuth ? props.login
                    : <NavLink to={"/Login"}>Login</NavLink>}
            </div>


        </header>)
}