import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/pngtree-vector-user-young-boy-avatar-icon-png-image_4827810.jpg";
import {UsersType} from "../../Redux/users-reducer";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UsersType>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    onPageChanged: (currentPage: number) => void
}
export const Users = (props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span className={props.currentPage === p ? styles.selectedPage : ""}
                                 onClick={() => {
                                     props.onPageChanged(p)
                                 }}

                    >{p}</span>
                })}

            </div>

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