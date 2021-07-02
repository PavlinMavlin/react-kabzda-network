import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";

export type FormDataType = {
    newMessageBody: string
}
const maxLength50=maxLengthCreator(50)
export const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (<form onSubmit={props.handleSubmit}>
        <div>
            <Field name={"newMessageBody"}
                  validate={[required,maxLength50]}
                   placeholder={"Enter your message"}
                   component={Textarea}/>
        </div>
        <div>
            <button>Send</button>
        </div>
    </form>)
}

export const AddMessageFormRedux = reduxForm<FormDataType>({
    form: "dialogsAddMessageForm"
})(AddMessageForm)