import React from "react";
import s from "./ProfileInfo.module.css"


export const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src={'https://img.as-creation.com/s0/031021.jpg'} alt={" "}/>
            </div>

            <div className={s.descriptionBlock}>
                ava+description
            </div>


        </div>

    )
}