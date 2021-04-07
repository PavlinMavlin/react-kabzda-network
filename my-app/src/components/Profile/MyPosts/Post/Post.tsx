import React from "react";
import s from './Post.module.css'

type PropsType = {
    message: string
    like: number
}

export function Post(props: PropsType) {
    return (


        <div className={s.item}>
            < img
                src={'https://img1.freepng.ru/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg'}/>
            {props.message}
            <div>
                <span>{props.like}</span>
            </div>
        </div>)

}