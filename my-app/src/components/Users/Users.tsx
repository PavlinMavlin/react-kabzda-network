import React from "react";
import styles from "./users.module.css"
import {InitialStateType, UsersType} from "../../Redux/users-reducer";
import axios from "axios"
import userPhoto from "../../assets/images/pngtree-vector-user-young-boy-avatar-icon-png-image_4827810.jpg"

type UsersPropsType = {
    users: Array<UsersType>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UsersType>) => void
}


export class Users extends React.Component<UsersPropsType, InitialStateType> {
    constructor(props: UsersPropsType) {
        super(props);
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                this.props.setUsers(response.data.items)
            }
        )
    }


    render() {
        return (
            <div>

                {this.props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {u.followed ?
                            <button onClick={() => {
                                this.props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                this.props.follow(u.id)
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
}

