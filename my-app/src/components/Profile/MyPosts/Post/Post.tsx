import React from "react";
import s from './Post.module.css'

type PostType = {
    message: string
    likesCount: number
}

//const Message: React.FC<MessageType>
export function Post(props: PostType) {
    return (


        <div className={s.item}>
            < img
                src={'https://img1.freepng.ru/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg'}
                alt={" "}/>
            {props.message}
            <div>
                <span>{props.likesCount}</span>
            </div>
        </div>)

}