import React from "react";
import styles from "./users.module.css"
import {UsersType} from "../../Redux/users-reducer";
import axios from "axios"
import userPhoto from "../../assets/images/pngtree-vector-user-young-boy-avatar-icon-png-image_4827810.jpg"

type UsersPropsType = {
    users: Array<UsersType>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UsersType>) => void
}
export const Users = (props: UsersPropsType) => {

    let getUser=()=>{  if (props.users.length === 0) {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            props.setUsers(response.data.items)
        })}




        // props.setUsers([
        //     {
        //         id: 1,
        //         photoUrl: 'https://img1.freepng.ru/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
        //         followed: true,
        //         fullName: "Dimma",
        //         status: "I am a boss",
        //         location: {city: "Minsk", country: "Belarus"}
        //     },
        //     {
        //         id: 2,
        //         photoUrl: 'https://img1.freepng.ru/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
        //         followed: true,
        //         fullName: "Saha",
        //         status: "I am a boss",
        //         location: {city: "Moscow", country: "Belarus"}
        //     },
        //     {
        //         id: 3,
        //         photoUrl: 'https://img1.freepng.ru/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg',
        //         followed: true,
        //         fullName: "Kola",
        //         status: "I am a boss",
        //         location: {city: "Kiev", country: "Belarus"}
        //     },
        // ])
    }


    return (
        <div>
            <button onClick={getUser}>Get user</button>
            {props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {u.followed ?
                            <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>}

                    </div>
                </span>
                    <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>

                </div>
            )}


        </div>)
}