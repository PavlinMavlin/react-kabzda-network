import React from "react";
import {UsersType} from "../../Redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UsersType>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    onPageChanged: (currentPage: number) => void
    followingInProgress: Array<number>
}

export const Users = (props: UsersPropsType) => {
    return (
        <div>

            <Paginator
                totalUsersCount={props.totalUsersCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onPageChanged={props.onPageChanged}


            />
            <div>
                {props.users.map(u => <User user={u}
                                            key={u.id}
                                            followingInProgress={props.followingInProgress}
                                            unfollow={props.unfollow}
                                            follow={props.follow}
                    />
                )}
            </div>
        </div>)

}