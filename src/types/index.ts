
export type UserType = {
    email:string,
    first_name:string,
    last_name:string
}

export type QuestionType = {
    answer:string,
    author:string,
    created_on:string,
    id:number,
    question:string
}

export type QuestionFormDataType ={
    question:string,
    answer:string
}

export type UserFormDataType = {
    email:string,
    first_name:string,
    last_name:string,
    password:string,
    confirmPassword:string
}