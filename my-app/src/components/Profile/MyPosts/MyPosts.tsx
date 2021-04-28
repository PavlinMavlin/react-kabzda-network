import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {PostType} from "../../../Redux/State";


type MyPostsType = {

    posts: Array<PostType>
    addPost: (postText: string) => void
    newPostText: string
    changeNewText:(newText:string)=>void
}


export const MyPosts = (props: MyPostsType) => {


    let postsElements = props.posts.map(
        (p) => <Post message={p.message} likesCount={p.likesCount}/>
    )

    // let newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {

        props.addPost(props.newPostText)

    }



    const onClickChangeTextHandler=(e:ChangeEvent<HTMLTextAreaElement>)=>{props.changeNewText(e.currentTarget.value)}

return (

    <div className={s.postsBlock}>
        <h3>My post</h3>
        <div>
            <div>
                <textarea onChange={onClickChangeTextHandler} value={props.newPostText}></textarea>
            </div>
            <div>
                <button onClick={addPost}>Add post</button>
            </div>
        </div>

        <div className={s.posts}>
            {postsElements}


        </div>
    </div>)

}