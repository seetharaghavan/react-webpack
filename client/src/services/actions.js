import axios from 'axios'; 
import { ADD_NOTE, BASE_URL, EDIT_NOTE, ERROR_NOTE, GET_NOTES, LOG_IN, LOG_IN_FAILED, REMOVE_NOTE } from '../types';

const httpClient = axios.create({
    baseURL: BASE_URL,
});

httpClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

export const login = (loginInfo) => async dispatch => {
    try{
        let res = await httpClient.post('/auth', loginInfo); 
        localStorage.setItem('token', res.data.token); 
        dispatch({
            type: LOG_IN,
            payload: res.data
        }); 
    }catch(e){
        dispatch({
            type: LOG_IN_FAILED,
            payload: e.message
        }); 
    }
}

export const me = ()  => async dispatch => {
    try{
        let res = await httpClient.get('/me'); 
        dispatch({
            type: LOG_IN,
            payload: res.data
        });
    }catch(e){
        dispatch({
            type: LOG_IN_FAILED,
            payload: e.message
        }); 
    }
}

export const logOut = () => dispatch => {
    localStorage.removeItem('token'); 
    dispatch({
        type: LOG_OUT
    })
}

export const getAllNotes = () => async dispatch =>  {
    try{
        let res = await httpClient.get('/api/notes'); 
        dispatch({
            type: GET_NOTES,
            payload: res.data
        });
    }catch(e){
        dispatch({
            type: ERROR_NOTE,
            payload: e.message
        });
    }
}

export const addNewNote = (note) => async dispatch =>  {
    try{
        let res = await httpClient.post('/api/notes', note); 
        dispatch({
            type: ADD_NOTE,
            payload: res.data
        });
    }catch(e){
        dispatch({
            type: ERROR_NOTE,
            payload: e.message
        });
    }
}

export const updateNote = (note) => async dispatch =>  {
    try{
        let res = await httpClient.put('/api/notes', note); 
        dispatch({
            type: EDIT_NOTE,
            payload: res.data
        });
    }catch(e){
        dispatch({
            type: ERROR_NOTE,
            payload: e.message
        });
    }
}


export const deleteNote = (note) => async dispatch =>  {
    try{
        let res = await httpClient.delete('/api/notes/'+note.id, ); 
        dispatch({
            type: REMOVE_NOTE,
            payload: note
        });
    }catch(e){
        dispatch({
            type: ERROR_NOTE,
            payload: e.message
        });
    }
}