import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {PostType} from "../../../Redux/profile-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";


type MyPostsType = {
    posts: Array<PostType>
    addPost: (postText: string) => void
}

export const MyPosts = (props: MyPostsType) => {

    let postsElements = props.posts.map(
        (p) => <Post message={p.message} likesCount={p.likesCount}/>
    )

    const addPost = (values:FormDataType) => {
        props.addPost(values.newPostText)
    }

    return (<div>
        <h3>My post</h3>
        <AddPostFormRedux onSubmit={addPost}/>
        <div className={s.posts}>
            {postsElements}


        </div>
    </div>)

}
type FormDataType = {
    newPostText: string
}

export const AddNewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'textarea'} name={'newPostText'}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export const AddPostFormRedux = reduxForm<FormDataType>({
    form: "ProfileAddNewPostForm"
})(AddNewPostForm)