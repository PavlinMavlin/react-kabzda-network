import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/pngtree-vector-user-young-boy-avatar-icon-png-image_4827810.jpg";
import {UsersType} from "../../Redux/users-reducer";
import {NavLink} from "react-router-dom"
import {usersAPI} from "../../api/api";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UsersType>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    onPageChanged: (currentPage: number) => void
    toggleIsFollowingProgress: (ifFetching: boolean, userID: number) => void
    followingInProgress: Array<number>
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
                        <NavLink to={"/profile/" + u.id}>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                    </NavLink>
                        </div>
                    <div>


                        {u.followed

                            ? <button disabled={props.followingInProgress.some(id => id == u.id)} onClick={() => {

                                props.toggleIsFollowingProgress(true, u.id);
                                usersAPI.unfollow(u.id).then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollow(u.id)
                                        }
                                        props.toggleIsFollowingProgress(false, u.id);
                                    }
                                )
                            }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.toggleIsFollowingProgress(true, u.id);
                                usersAPI.follow(u.id).then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.follow(u.id)
                                        }
                                        props.toggleIsFollowingProgress(false, u.id)
                                    }
                                )
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