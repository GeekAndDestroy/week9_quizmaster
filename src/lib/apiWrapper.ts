import axios from 'axios';
import { UserFormType, UserType, QuestionType, EditUserFormType, QuestionFormDataType } from '../types';


const baseURL:string = 'https://cae-bookstore.herokuapp.com'
const userEndpoint:string = '/user'
const allQuestionsEndpoint:string = '/question/all'
const questionsEndpoint:string = '/question'
const loginEndpoint:string = '/login'




const apiClientNoAuth = () => axios.create({
    baseURL: baseURL
})

const apiClientBasicAuth = (email:string, password:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Basic ' + btoa(email + ':' + password)
    }
})

const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Bearer ' + token
    }
})

type APIResponse<T> = {
    data?: T,
    error?: string
}

async function register(newUserData:UserFormType): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function login(email:string, password:string): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientBasicAuth(email, password).get(loginEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function editUser(token:string, userData:Partial<UserType>): Promise<APIResponse<EditUserFormType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).put(userEndpoint, userData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function deleteUser(token:string): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).delete(userEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function getAllQuestions(): Promise<APIResponse<{'questions':QuestionType[]}>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(allQuestionsEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}


async function createQuestion(questionData:QuestionFormDataType, token:string): Promise<APIResponse<QuestionFormDataType>> { 
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).post(questionsEndpoint, questionData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function getQuestionById(id:number): Promise<APIResponse<QuestionType>> { 
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(`${questionsEndpoint}/${id}`);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function getMyQuestions(token:string): Promise<APIResponse<{'questions':QuestionType[]}> > { 
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).get(questionsEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function editQuestionById(id:number, questionData:Partial<QuestionType>, token:string): Promise<APIResponse<QuestionType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).put(`${questionsEndpoint}/${id}`, questionData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}


async function deleteQuestionById(id:number, token:string): Promise<APIResponse<QuestionType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).delete(`${questionsEndpoint}/${id}`);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}



export {
    register, 
    getAllQuestions, 
    createQuestion, 
    editQuestionById, 
    deleteQuestionById, 
    login, 
    getMyQuestions,
    editUser,
    deleteUser,
    getQuestionById
}
