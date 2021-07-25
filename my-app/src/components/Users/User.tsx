import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/pngtree-vector-user-young-boy-avatar-icon-png-image_4827810.jpg";
import {UsersType} from "../../Redux/users-reducer";
import {NavLink} from "react-router-dom"

type UserPropsType = {
    user: UsersType
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    followingInProgress: Array<number>
}

export const User = (props: UserPropsType) => {

    return (

        <div>
                <span>
                    <div>
                        <NavLink to={"/profile/" + props.user.id}>
                        <img src={props.user.photos.small !== null ? props.user.photos.small : userPhoto}
                             className={styles.userPhoto}/>
                    </NavLink>
                        </div>
                    <div>

                        {props.user.followed

                            ? <button disabled={props.followingInProgress.some(id => id == props.user.id)}
                                      onClick={() => {
                                          props.unfollow(props.user.id)
                                      }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                      onClick={() => {
                                          props.follow(props.user.id)
                                      }}>
                                Follow
                            </button>}

                            </div>
                            </span>
            <span>
                            <span>
                            <div>{props.user.name}</div>
                            <div>{props.user.status}</div>
                            </span>
                            <span>
                            <div>{"props.user.location.country"}</div>
                            <div>{"props.user.location.city"}</div>
                            </span>
                            </span>

        </div>


    )

}