import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {PostType} from "../../../Redux/profile-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";


type MyPostsType = {
    posts: Array<PostType>
    addPost: (postText: string) => void
}

export const MyPosts = React.memo((props: MyPostsType) => {

        let postsElements = [...props.posts]
            .reverse().map(
                (p) => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>
            )

        const addPost = (values: FormDataType) => {
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
)

type FormDataType = {
    newPostText: string
}

const maxLength10 = maxLengthCreator(10)

export const AddNewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       validate={[required, maxLength10]}
                       placeholder={"Post message"}
                       name={'newPostText'}/>
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