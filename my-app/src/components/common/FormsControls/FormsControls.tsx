import React from "react";
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from 'redux-form'
import styles from '../FormsControls/FormsControls.module.css'

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}
export type FieldValidatorType = (value: string) => string | undefined
const FormControl = ({input, meta, child, element, ...props}: any) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const createField = <FormKeysType extends string>(placeholder: string | null, name: FormKeysType, component: React.FC<WrappedFieldProps>, validators: Array<FieldValidatorType>, props = {}, text = "") => {
    <div>
        <Field placeholder={placeholder}
               name={name}
               component={component}
               validate={validators}
               {...props}
        />{text}
    </div>
}


//React.FC<WrappedFieldProps>